using System;
using System.Data;
using System.Linq;
using System.Web.Mvc;
using CCOM.Mvc.Live.Security;
//using IMAnnualReview.Domain.Entities;
//using IMAnnualReview.Domain.Live;
using IMAnnualReview.Repository;
using IMAnnualReview.Filters;
using PagedList;
using CCOM.IServices;
using CCOM;

namespace IMAnnualReview.Areas.Admin.Controllers
{
    //[HandleError] //To handle errors through app, uncomment this attribute and set customErrors settings in Web.config
    [IMCopyCenterAskIMAuthorize]
    public class AppSecurityLogController : Controller
    {
        private readonly IMAnnualReportEntities _context = new IMAnnualReportEntities();
        protected ILoggingService LoggingService { get; set; }

        public AppSecurityLogController() : this(null) { }

        public AppSecurityLogController(ILoggingService loggingService)
        {
            var connectionString = new IMAnnualReportEntities().Database.Connection.ConnectionString;            
            LoggingService = loggingService ?? ServiceFactory.LoggingService(connectionString);
        }

        public ActionResult AutoCompleteSearch(string term)
        {            
            var users = _context.AppUsers.Where(s => s.UserId.Contains(term)).Take(10).Select(s => new { label = s.UserId });
            return Json(users, JsonRequestBehavior.AllowGet);
        }

        public ViewResult Index(string sortOrder, string currentFilter, string searchString, int? page)
        {
            ViewBag.CurrentSort = sortOrder;
            ViewBag.CreatedSortParm = String.IsNullOrEmpty(sortOrder) ? "Created asc" : "";
            ViewBag.CategorySortParm = sortOrder == "Category" ? "Category desc" : "Category";

            if (Request.HttpMethod == "GET")
            {
                searchString = currentFilter;
            }
            else
            {
                page = 1;
            }

            ViewBag.CurrentFilter = searchString;

            var logs = from s in _context.AppSecurityLogs
                       select s;

            if (!String.IsNullOrEmpty(searchString))
            {
                logs = logs.Where(s => s.CreatedBy.ToUpper().Contains(searchString.ToUpper()));
            }

            switch (sortOrder)
            {
                case "Created asc":
                    logs = logs.OrderBy(s => s.Created);
                    break;
                case "Category":
                    logs = logs.OrderBy(s => s.Category);
                    break;
                case "Category desc":
                    logs = logs.OrderByDescending(s => s.Category);
                    break;
                default:
                    logs = logs.OrderByDescending(s => s.Created);
                    break;

            }

            int pageSize = 20;
            int pageNumber = (page ?? 1);
            return View(logs.ToPagedList(pageNumber, pageSize));            
        }

        public ViewResult Details(int id)
        {
            AppSecurityLog appsecuritylog = _context.AppSecurityLogs.Single(x => x.AppSecurityLogId == id);
            return View(appsecuritylog);
        }

        public ActionResult Create()
        {
            return View();
        } 

        [HttpPost]
        public ActionResult Create(AppSecurityLog appsecuritylog)
        {
            if (ModelState.IsValid)
            {
                _context.AppSecurityLogs.Add(appsecuritylog);
                _context.SaveChanges();
                return RedirectToAction("Index");  
            }

            return View(appsecuritylog);
        }
 
        public ActionResult Edit(int id)
        {
            AppSecurityLog appsecuritylog = _context.AppSecurityLogs.Single(x => x.AppSecurityLogId == id);
            return View(appsecuritylog);
        }

        [HttpPost]
        public ActionResult Edit(AppSecurityLog appsecuritylog)
        {
            if (ModelState.IsValid)
            {
                _context.Entry(appsecuritylog).State = System.Data.Entity.EntityState.Modified;
                _context.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(appsecuritylog);
        }
 
        public ActionResult Delete(int id)
        {
            AppSecurityLog appsecuritylog = _context.AppSecurityLogs.Single(x => x.AppSecurityLogId == id);
            return View(appsecuritylog);
        }

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            AppSecurityLog appsecuritylog = _context.AppSecurityLogs.Single(x => x.AppSecurityLogId == id);
            _context.AppSecurityLogs.Remove(appsecuritylog);
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
