using System;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
//using IMAnnualReview.Domain.Entities;
//using IMAnnualReview.Domain.Live;
using IMAnnualReview.Repository;
using CCOM;
using CCOM.IServices;
using CCOM.Mvc.Live.Security;
using IMAnnualReview.Filters;

namespace IMAnnualReview.Areas.Admin.Controllers
{
    //[HandleError] //To handle errors through app, uncomment this attribute and set customErrors settings in Web.config
    [IMCopyCenterAskIMAuthorize]
    public class AppRoleController : Controller
    {
        private readonly IMAnnualReportEntities _context = new IMAnnualReportEntities();
        protected ILoggingService LoggingService { get; set; }

        public AppRoleController() : this(null) { }

        public AppRoleController(ILoggingService loggingService)
        {
            var connectionString = new IMAnnualReportEntities().Database.Connection.ConnectionString;
            LoggingService = ServiceFactory.LoggingService(connectionString);            
        }

        public ViewResult Index()
        {
            return View();//_context.AppRoles.Include(approle => approle.AppUserRoles).ToList());
        }

        public ActionResult Details(int id)
        {
            AppRole approle = _context.AppRoles.Find(id);
            if (approle != null)
            {
                if (Request.IsAjaxRequest())
                {
                    return PartialView("_Details", approle);
                }
                else
                {
                    return View(approle);
                }
            }
            else
            {
                throw new Exception("No Details for Role id: " + id);
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
        public ActionResult Create(AppRole approle)
        {
            if (ModelState.IsValid)
            {
                //log                                
                LoggingService.LogMessage("Create role: " + approle.RoleName, "Insert", SessionFactory.SecuritySessionState().PassportId);   

                //create new role
                var newAppRole = new AppRole
                {
                    RoleName = approle.RoleName,
                    LongDesc = approle.LongDesc,
                    ShortDesc = approle.ShortDesc,
                    RoleAbbr = approle.RoleAbbr,
                    Active = approle.Active,
                    CreatedBy = SessionFactory.SecuritySessionState().PassportId,
                    UpdatedBy = SessionFactory.SecuritySessionState().PassportId,
                    DateCreated = DateTime.Now,
                    DateUpdated = DateTime.Now
                };

                //Add to model and save to db                
                _context.AppRoles.Add(newAppRole);
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
                return PartialView("_Create", approle);
            }

            return View(approle);
        }        
 
        public ActionResult Edit(int id)
        {
            AppRole approle = _context.AppRoles.Find(id);
            if (approle != null)
            {
                if (Request.IsAjaxRequest())
                {
                    return PartialView("_Edit", approle);
                }
                else
                {
                    return View(approle);
                }
            }
            else
            {
                throw new Exception("Cannot Edit Role id: " + id);
            }  
        }

        [HttpPost]
        public ActionResult Edit(AppRole approle)
        {
            if (ModelState.IsValid)
            {
                //log                                
                LoggingService.LogMessage("Edit role: " + approle.RoleName, "Edit", SessionFactory.SecuritySessionState().PassportId);   

                AppRole appRoletoUpdate = _context.AppRoles.Find(approle.AppRoleId);

                appRoletoUpdate.RoleName = approle.RoleName;
                appRoletoUpdate.RoleAbbr = approle.RoleAbbr;
                appRoletoUpdate.ShortDesc = approle.ShortDesc;
                appRoletoUpdate.LongDesc = approle.LongDesc;
                appRoletoUpdate.Active = approle.Active;
                appRoletoUpdate.UpdatedBy = SessionFactory.SecuritySessionState().PassportId;
                appRoletoUpdate.DateUpdated = DateTime.Now;
                
                _context.Entry(appRoletoUpdate).State = System.Data.Entity.EntityState.Modified;
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

            if (Request.IsAjaxRequest())
            {
                return PartialView("_Edit", approle);
            }

            return View(approle);
        }
 
        public ActionResult Delete(int id)
        {
            AppRole approle = _context.AppRoles.Find(id);
            if (approle != null)
            {
                if (Request.IsAjaxRequest())
                {
                    return PartialView("_Delete", approle);
                }
                else
                {
                    return View(approle);
                }
            }
            else
            {
                throw new Exception("Cannot Delete Role id: " + id);
            }  
        }

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            AppRole approle = _context.AppRoles.Find(id);

            //log                                
            LoggingService.LogMessage("Delete role: " + approle.RoleName, "Delete", SessionFactory.SecuritySessionState().PassportId);   

            _context.AppRoles.Remove(approle);
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

        protected override void OnException(ExceptionContext filterContext)
        {
            LoggingService.LogMessage(filterContext.Exception.ToString(), "Error", SessionFactory.SecuritySessionState().PassportId);
        }
    }
}
