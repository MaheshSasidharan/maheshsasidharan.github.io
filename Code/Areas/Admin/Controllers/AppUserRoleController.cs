using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using System.Data.Entity.Core;
//using IMAnnualReview.Domain.Entities;
//using IMAnnualReview.Domain.Live;
using IMAnnualReview.Repository;
using CCOM.Mvc.Live.Security;
using CCOM.IServices;
using CCOM;
using IMAnnualReview.Filters;

namespace IMAnnualReview.Areas.Admin.Controllers
{
    //[HandleError] //To handle errors through app, uncomment this attribute and set customErrors settings in Web.config
    [IMCopyCenterAskIMAuthorize]
    public class AppUserRoleController : Controller
    {
        private readonly IMAnnualReportEntities _context = new IMAnnualReportEntities();
        protected ILoggingService LoggingService { get; set; }

        public AppUserRoleController() : this(null) { }

        public AppUserRoleController(ILoggingService loggingService)
        {
            var connectionString = new IMAnnualReportEntities().Database.Connection.ConnectionString;            
            LoggingService = loggingService ?? ServiceFactory.LoggingService(connectionString);
        }

        public ViewResult Index()
        {
            return View();//_context.AppUserRoles.Include(appuserrole => appuserrole.AppUser).Include(appuserrole => appuserrole.AppRole).ToList());
        }

        public ViewResult Details(int id)
        {
            AppUserRole appuserrole = _context.AppUserRoles.Single(x => x.AppUserRoleId == id);
            return View(appuserrole);
        }

        public ActionResult Create()
        {
            ViewBag.PossibleAppUsers = _context.AppUsers;
            ViewBag.PossibleAppRoles = _context.AppRoles;
            return View();
        } 

        [HttpPost]
        public ActionResult Create(AppUserRole appuserrole)
        {
            if (ModelState.IsValid)
            {
                _context.AppUserRoles.Add(appuserrole);
                _context.SaveChanges();
                return RedirectToAction("Index");  
            }

            ViewBag.PossibleAppUsers = _context.AppUsers;
            ViewBag.PossibleAppRoles = _context.AppRoles;
            return View(appuserrole);
        }
 
        public ActionResult Edit(int id)
        {
            AppUserRole appuserrole = _context.AppUserRoles.Single(x => x.AppUserRoleId == id);
            ViewBag.PossibleAppUsers = _context.AppUsers;
            ViewBag.PossibleAppRoles = _context.AppRoles;
            return View(appuserrole);
        }

        [HttpPost]
        public ActionResult Edit(AppUserRole appuserrole)
        {
            if (ModelState.IsValid)
            {
                _context.Entry(appuserrole).State = EntityState.Modified;
                _context.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.PossibleAppUsers = _context.AppUsers;
            ViewBag.PossibleAppRoles = _context.AppRoles;
            return View(appuserrole);
        }

        public ActionResult Delete(int id)
        {
            AppUserRole appuserrole = _context.AppUserRoles.Single(x => x.AppUserRoleId == id);
            return View(appuserrole);
        }

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            AppUserRole appuserrole = _context.AppUserRoles.Single(x => x.AppUserRoleId == id);
            _context.AppUserRoles.Remove(appuserrole);
            _context.SaveChanges();
            return RedirectToAction("Index");
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
