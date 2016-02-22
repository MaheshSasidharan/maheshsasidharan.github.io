using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using CCOM.Sso.Helpers;
using IMAnnualReview.Repository;
using IMAnnualReview.Filters;
using IMAnnualReview.ViewModels;
using CCOM;
using CCOM.IServices;
using CCOM.Mvc.Live.Security;

namespace IMAnnualReview.Areas.Admin.Controllers
{
    //[HandleError] //To handle errors through app, uncomment this attribute and set customErrors settings in Web.config
    [IMCopyCenterAskIMAuthorize]
    public class AppUserController : Controller
    {
        private readonly IMAnnualReportEntities _context = new IMAnnualReportEntities();
        protected ILoggingService LoggingService { get; set; }

        public AppUserController() : this(null) { }

        public AppUserController(ILoggingService loggingService)
        {
            var connectionString = new IMAnnualReportEntities().Database.Connection.ConnectionString;            
            LoggingService = loggingService ?? ServiceFactory.LoggingService(connectionString);
        }

        public ViewResult Index()
        {
            return View();//_context.AppUsers.Include(appuser => appuser.AppUserRoles).ToList());
        }

        public ActionResult Details(int id)
        {
            AppUser appuser = _context.AppUsers.Find(id);
            if (appuser != null)
            {
                if (Request.IsAjaxRequest())
                {
                    return PartialView("_Details", appuser);
                }
                else
                {
                    return View(appuser);
                }
            }
            else
            {
                throw new Exception("No Details for User id: " + id);
            } 
        }

        public ActionResult Create()
        {
            if (Request.IsAjaxRequest())
            {
                return PartialView("_Create");
            }
            else
            {
                return View();
            }
        } 

        [HttpPost]
        public ActionResult Create(AppUser appuser)
        {

            if (ModelState.IsValid)
            {
                //log                                
                LoggingService.LogMessage("Create user: " + appuser.UserId, "Insert", SessionFactory.SecuritySessionState().PassportId);                

                //create new user
                var newAppUser = new AppUser
                {
                    UserId = appuser.UserId,
                    Active = appuser.Active,
                    Email = appuser.Email,
                    FirstName = appuser.FirstName,
                    LastName = appuser.LastName,
                    CreatedBy = SessionFactory.SecuritySessionState().PassportId,
                    UpdatedBy = SessionFactory.SecuritySessionState().PassportId,
                    DateCreated = DateTime.Now,
                    DateUpdated = DateTime.Now
                };

                //Add to model and save to db                
                _context.AppUsers.Add(newAppUser);
                _context.SaveChanges();
                if (Request.IsAjaxRequest())
                {
                    return PartialView("_CreateSuccess");
                }
                else
                {
                    return RedirectToAction("Index");
                }
            }

            if (Request.IsAjaxRequest())
            {
                return PartialView("_Create", appuser);
            }

            return View(appuser);
        }
 
        public ActionResult Edit(int id)
        {
            try
            {
                AppUser appuser = _context.AppUsers.Find(id);
                PopulateUserRoles(appuser);
                if (Request.IsAjaxRequest())
                {
                    return PartialView("_Edit", appuser);
                }
                else
                {
                    return View(appuser);
                }
            }
            catch (Exception)
            {
                throw new Exception("Cannot Edit User id: " + id);
            }
        }

        [HttpPost]        
        public ActionResult Edit(int id, FormCollection formCollection, string[] selectedRoles)
        {
            var userToUpdate = _context.AppUsers                
                            //.Include(i => i.AppUserRoles)
                            .Where(i => i.AppUserId == id)
                            .Single();
            if (TryUpdateModel(userToUpdate, "", null, new string[] { "AppUserRoles" }))
            {
                try
                {
                    //log                                
                    LoggingService.LogMessage("Edit user: " + userToUpdate.UserId, "Edit", SessionFactory.SecuritySessionState().PassportId); 

                    //update who is editing and when
                    userToUpdate.DateUpdated = DateTime.Now;
                    userToUpdate.UpdatedBy = SessionFactory.SecuritySessionState().PassportId;

                    UpdateUserRoles(selectedRoles, userToUpdate);

                    _context.Entry(userToUpdate).State = EntityState.Modified;
                    _context.SaveChanges();

                    if (Request.IsAjaxRequest())
                    {
                        return PartialView("_EditSuccess");
                    }
                    else
                    {
                        return RedirectToAction("Index");
                    }
                }
                catch (DataException)
                {
                    //Log the error (add a variable name after DataException)
                    ModelState.AddModelError("", "Unable to save changes. Try again, and if the problem persists, see your system administrator.");
                }
            }
            PopulateUserRoles(userToUpdate);

            if (Request.IsAjaxRequest())
            {
                return PartialView("_Edit", userToUpdate);
            }

            return View(userToUpdate);
        }

        private void UpdateUserRoles(string[] selectedRoles, AppUser userToUpdate)
        {
            //If you want to delete/remove all roles from a User
            if (selectedRoles == null)
            {
                //log                               
                LoggingService.LogMessage("Delete all Roles for " + userToUpdate.UserId, "Delete", SessionFactory.SecuritySessionState().PassportId);

                var context2 = new IMAnnualReportEntities();
                var roletodelete = from u in context2.AppUserRoles
                                   where u.AppUserId == userToUpdate.AppUserId
                                   select u;

                foreach (var userRole in roletodelete)
                {
                    var roleNum = userRole.AppUserRoleId;
                    AppUserRole appUserRole = _context.AppUserRoles.Find(roleNum);
                    _context.AppUserRoles.Remove(appUserRole);
                }

                return;
            }

            var selectedRoles2 = new HashSet<string>(selectedRoles);
            var userRoles = new HashSet<int>();
                 //(userToUpdate.AppUserRoles.Select(c => c.AppRoleId));
            foreach (var role in _context.AppRoles)
            {
                if (selectedRoles2.Contains(role.AppRoleId.ToString()))
                {
                    //Add Role to User
                    if (!userRoles.Contains(role.AppRoleId))
                    {
                        //log                                        
                        LoggingService.LogMessage("Added " + role.RoleName + " Role for User " + userToUpdate.UserId, "Insert", SessionFactory.SecuritySessionState().PassportId); 

                        var appUserRole = new AppUserRole
                        {
                            AppRoleId = role.AppRoleId,
                            AppUserId = userToUpdate.AppUserId,
                            OrderBy = 10,
                            Active = true,
                            DateCreated = new DateTime(2012, 5, 15),
                            DateUpdated = new DateTime(2012, 5, 15),
                            CreatedBy = SessionFactory.SecuritySessionState().PassportId,
                            UpdatedBy = SessionFactory.SecuritySessionState().PassportId
                        };

                        _context.AppUserRoles.Add(appUserRole);
                    }
                }
                else
                {
                    //Remove/Delete Role from User
                    if (userRoles.Contains(role.AppRoleId))
                    {
                        var context2 = new IMAnnualReportEntities();
                        var roleSearch = role;
                        var roletodelete = from u in context2.AppUserRoles
                                           where u.AppRoleId == roleSearch.AppRoleId
                                           && u.AppUserId == userToUpdate.AppUserId
                                           select u;

                        var roleNum = 0;
                        foreach (var userRole in roletodelete)
                        {
                            roleNum = userRole.AppUserRoleId;
                        }

                        //log                                        
                        LoggingService.LogMessage("Delete " + role.RoleName + " Role for User " + userToUpdate.UserId, "Delete", SessionFactory.SecuritySessionState().PassportId);

                        AppUserRole appUserRole = _context.AppUserRoles.Find(roleNum);
                        _context.AppUserRoles.Remove(appUserRole);
                    }
                }
            }
        }
 
        public ActionResult Delete(int id)
        {
            AppUser appuser = _context.AppUsers.Find(id);
            if (appuser != null)
            {
                if (Request.IsAjaxRequest())
                {
                    return PartialView("_Delete", appuser);
                }
                else
                {
                    return View(appuser);
                }
            }
            else
            {
                throw new Exception("Cannot Delete User id: " + id);
            }  
        }


        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            AppUser appuser = _context.AppUsers.Find(id);

            //log                                
            LoggingService.LogMessage("Delete user: " + appuser.UserId, "Delete", SessionFactory.SecuritySessionState().PassportId); 

            //delete from Model and DB
            _context.AppUsers.Remove(appuser);
            _context.SaveChanges();

            if (Request.IsAjaxRequest())
            {
                return PartialView("_DeleteSuccess");
            }
            else
            {
                return RedirectToAction("Index");
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing) {
                _context.Dispose();
            }
            base.Dispose(disposing);
        }

        private void PopulateUserRoles(AppUser appuser)
        {
            var allRoles = _context.AppRoles;
            var userRoles = new HashSet<int>();//appuser.AppUserRoles.Select(c => c.AppRoleId));
            var viewModel = new List<UserRoles>();
            foreach (var role in allRoles)
            {
                viewModel.Add(new UserRoles
                {
                    AppRoleId = role.AppRoleId,
                    RoleName = role.RoleName,
                    Assigned = userRoles.Contains(role.AppRoleId)
                });
            }
            ViewBag.Roles = viewModel;
        }

        protected override void OnException(ExceptionContext filterContext)
        {
            LoggingService.LogMessage(filterContext.Exception.ToString(), "Error", SessionFactory.SecuritySessionState().PassportId);
        }
    }
}
