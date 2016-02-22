using System;
using System.Data;
using System.Linq;
using System.Web.Mvc;
//using IMAnnualReview.Domain.Entities;
//using IMAnnualReview.Domain.Live;
using IMAnnualReview.Repository;
using IMAnnualReview.Filters;
using PagedList;
using CCOM.Mvc.Live.Security;
using CCOM.IServices;
using CCOM;

namespace IMAnnualReview.Areas.Admin.Controllers
{
    //[HandleError] //To handle errors through app, uncomment this attribute and set customErrors settings in Web.config
    [IMCopyCenterAskIMAuthorize]
    public class AppLogController : Controller
    {
        private readonly IMAnnualReportEntities _context = new IMAnnualReportEntities();
        protected ILoggingService LoggingService { get; set; }

        public AppLogController() : this(null) { }

        public AppLogController(ILoggingService loggingService)
        {
            var connectionString = new IMAnnualReportEntities().Database.Connection.ConnectionString;            
            LoggingService = loggingService ?? ServiceFactory.LoggingService(connectionString);
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

            var logs = from s in _context.AppLogs
                       select s;

            //if (!String.IsNullOrEmpty(searchString))
            //{
            //    logs = logs.Where(s => s.Message.ToUpper().Contains(searchString.ToUpper())
            //                           || s.Message.ToUpper().Contains(searchString.ToUpper()));
            //}

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
            AppLog applog = _context.AppLogs.Single(x => x.AppLogId == id);
            return View(applog);
        }

        public ActionResult Create()
        {            
            return View();
        } 

        [HttpPost]
        public ActionResult Create(AppLog applog)
        {
            if (ModelState.IsValid)
            {
                _context.AppLogs.Add(applog);
                _context.SaveChanges();
                return RedirectToAction("Index");  
            }

            return View(applog);
        }
 
        public ActionResult Edit(int id)
        {
            AppLog applog = _context.AppLogs.Single(x => x.AppLogId == id);
            return View(applog);
        }

        [HttpPost]
        public ActionResult Edit(AppLog applog)
        {
            if (ModelState.IsValid)
            {
                _context.Entry(applog).State = System.Data.Entity.EntityState.Modified;
                _context.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(applog);
        }
 
        public ActionResult Delete(int id)
        {
            AppLog applog = _context.AppLogs.Single(x => x.AppLogId == id);
            return View(applog);
        }

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            AppLog applog = _context.AppLogs.Single(x => x.AppLogId == id);
            _context.AppLogs.Remove(applog);
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
