using System;
using System.Linq;
using System.Web.Mvc;
using CCOM;
using CCOM.Entities;
using CCOM.Mvc.Live.Security;
//using IMAnnualReview.Domain.Entities;
//using IMAnnualReview.Domain.Live;
using IMAnnualReview.Repository;
using CCOM.IServices;
using IMAnnualReview.Filters;

namespace IMAnnualReview.Areas.Admin.Controllers
{
    //[HandleError] //To handle errors through app, uncomment this attribute and set customErrors settings in Web.config
    [IMCopyCenterAskIMAuthorize]        
    public class HomeController : Controller
    {
        private readonly IMAnnualReportEntities _context = new IMAnnualReportEntities();
        protected ILoggingService LoggingService { get; set; }

        public HomeController() : this(null) { }

        public HomeController(ILoggingService loggingService)
        {
            var connectionString = new IMAnnualReportEntities().Database.Connection.ConnectionString;
            LoggingService = loggingService ?? ServiceFactory.LoggingService(connectionString);
        }

        public ActionResult Index()
        {                        
            return RedirectToAction("Index", "AppUser");
        }

        protected override void OnException(ExceptionContext filterContext)
        {
            LoggingService.LogMessage(filterContext.Exception.ToString(), "Error", SessionFactory.SecuritySessionState().PassportId);
        }

    }
}
