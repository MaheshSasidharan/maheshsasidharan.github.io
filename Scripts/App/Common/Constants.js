MSPortfolio

.factory('Factory_Constants', [Constants])

function Constants() {
    var oConstants = {
        Miscellaneous: {
            SomethingWentWrong: "Sorry. Something went wrong."
        },
        MSPortfolio: {
            Projects: [{
                Title: "Screener – Department of Psychiatry (Present)",
                Role: "Student Research Assistant - D​esigner and ​Developer",
                Technologies: "N​ode.js, AngularJS, MySQL",
                Link: [{
                    Type: "github.png",
                    Title: "Github",
                    Link: "https://github.com/MaheshSasidharan/ScreenerApp"
                }],
                Responsibilities: [
                    "Retrieve response time, accuracy in synchronization of tone and user audio",
                    "Matrix reasoning, Picture Prompt, Speech analysis",
                    "Create sessions for user authentication",
                    "Obtain video, audio, image from user based on required assessments"
                ]
            },
            {
                Title: "Hospital department applications (Present)",
                Role: "Graduate Research Assistant - D​esigner and ​Developer",
                Technologies: ".N​et 4.5 MVC, AngularJS, Entity Framework, SQL",
                Responsibilities: [
                    "Created employee and resource management applications",
                    "Migrated oracle forms to HTML5 applications",
                    "Created dynamic forms using AngularJS",
                    "Created complex SQL objects",
                    "Code using MVC .NET 4.5"
                ]
            }, {
                Title: "Auto Scheduler – Graduate Project",
                Role: "Designer and Developer",
                Technologies: "Swift 3, iOS, N​ode.js, Push notification",
                Link: [{
                    Type: "github.png",
                    Title: "Github - App",
                    Link: "https://github.com/skalyanmoguloju/auto_scheduler"
                }, {
                    Type: "github.png",
                    Title: "Github - Server",
                    Link: "https://github.com/MaheshSasidharan/AutoSchedulerServer"
                }],
                Responsibilities: [
                    "Designed meeting views",
                    "Created Node.js server for communication, calculation and push notification",
                    "Allow to create meeting, add users, location, time",
                    "Allow to give meeting preference based on free times, and cancel meeting",
                    "Add meeting to iCalendar"
                ]
            }, {
                Title: "Kompair – Graduate Project",
                Role: "Designer and Developer",
                Technologies: "Ionic, FireBase, AngularJS, HTML5, CSS3, Android, iOS",
                Link: [{
                    Type: "github.png",
                    Title: "Github",
                    Link: "https://github.com/MaheshSasidharan/Kompair"
                }],
                Responsibilities: [
                    "Designed firebase schemas",
                    "Authentication using Cordova",
                    "Create comparisons, add categories of different types",
                    "Allow to search, allow to like, dislike, favorite"
                ]
            }, {
                Title: "Wiki-College – Graduate Project",
                Role: "Designer and Developer",
                Technologies: "Ruby on Rails, MySQL, AngularJS, HTML5, CSS3",
                Link: [{
                    Type: "github.png",
                    Title: "Github",
                    Link: "https://github.com/MaheshSasidharan/WikiCollege"
                }],
                Responsibilities: [
                    "Designed relational schemas",
                    "Created website with authentication with session",
                    "Develop ability to form groups and interact with other users of website",
                    "Created test cases using RSpec"
                ]
            },
            {
                Title: "Expense Management",
                Role: "​Designer and ​Developer",
                Technologies: ".N​et 4.5 Web API, AngularJS, Entity Framework, SQL",
                Responsibilities: [
                "Create highly modular interface using HTML5 and AngularJS",
                "Create custom filters and reusable directives",
                "Code in Web API using .NET 4.5 features",
                "Develop Unit-Test using Dependency Injection",
                "Got Rockstar, ​ Hero​ and Above and Beyond​ award"
                ]
            }, {
                Title: "Document Management System",
                Role: "​Team Lead - Hyderabad",
                Technologies: ".N​et 4.5, SharePoint 2013",
                Responsibilities: [
                "Analyze Client requirements and create Requirement Analysis documents",
                "Create POCs and Design document",
                "Create external content type in VS",
                "Use BCS model and integrate with SharePoint enterprise search"
                ]
            }, {
                Title: "Platform Migration - SharePoint 2013 and Enhancements",
                Role: "Lead developer",
                Technologies: "​.Net 4.5, SharePoint 2013, HTML5, jQuery, JavaScript, SQL 2014",
                Responsibilities: [
                "Created Search app using SharePoint Search Enterprise",
                "Remove SharePoint 80 and web part dependencies by creating Web API",
                "Implementing CORS",
                "Improvise existing features by increasing performance, page load time, on demand loading",
                "Managed a team of 5, trained and allocated tasks",
                "Got Spot award - Mr. Committed ​for handling complex components and business logics and for on time delivery"
                ]
            }, {
                Title: "Access Automation: Database Cube access and Business Data Access",
                Role: "Full Stack developer",
                Technologies: ".Net 3.5, SharePoint 2010, HTML5, CSS3, jQuery, JavaScript, SQL",
                Responsibilities: [
                "Created portal to automate user requests for access on database and cube",
                "Show/update current permissions",
                "Automatic mail sent to corresponding stake holders",
                "Got Spot award​ for creating self-initiated automation tool that helped",
                "Reduced team efforts by 50% for certain tasks"
                ]
            }, {
                Title: "Marketing Operations​: Platform Development​",
                Role: "Developer",
                Technologies: ".Net 3.5, SSIS, SQL 2012",
                Responsibilities: [
                "Provide data security with authorization and authentication",
                "Designed and developed tool for Site Management",
                "Setup TFS and dev. environment, sprint management",
                "Conducted code reviews, and project review"
                ]
            },
            {
                Title: "Sonar Battles – Android Game",
                Role: "Designer and Developer",
                Technologies: "Java, Eclipse, SQLite",
                Link: [{
                    Type: "googleplay.jpg",
                    Title: "Google Play",
                    Link: "https://play.google.com/store/apps/details?id=iffi.mah.preetha&amp;hl=en"
                }],
                Responsibilities: [
                "Created 2-D game Sonar-Battles for Android 2.3.3 and above, using Android Framework involving Java and SQLite"
                ]
            }, {
                Title: "Saturn: 3D",
                Role: "Developer",
                Technologies: "C++, OpenGL",
                Responsibilities: [
                    "Developed 3D simulation of Saturn’s orbit around the Sun using OpenGL"
                ]
            }, {
                Title: "Note Maker",
                Role: "Designer and Developer",
                Technologies: "JavaScript, HTML5, CSS3",
                Link: [{
                    Type: "github.png",
                    Title: "Github",
                    Link: "https://github.com/MaheshSasidharan/NoteMaker"
                }],
                Responsibilities: [
                    "Pure Javascript based Note Maker app",
                    "Create, add and edit notes and save using Session"
                ]
            }],
            Positions: [{
                Position: "Research Assistant",
                When: "2016-Present",
                Where: "Department of Psychiatry",
                Role: "Mobile and web apps designer and developer",
                Responsibility: "Design and develop light and modular solution for patient screening",
                Technologies: "N​ode.js, AngularJS, MySQL"
            },
            {
                Position: "Graduate Assistant",
                When: "2015-Present",
                Where: "Internal Medicines Department, University of Iowa",
                Role: "Custom Solutions Developer",
                Responsibility: "End to End development of Employee Management Systems",
                Technologies: "ASP.Net MVC, Web API, HTML, AngularJS, SSMS"
            },
            {
                Position: "Consultant 2",
                When: "2014-2015",
                Where: "Neudesic, Hyderabad",
                Role: "Custom Application Developer",
                Responsibility: "Mainly Client side application development",
                Technologies: ".Net Entity Framework, SQL, HTML, AngularJS"
            },
            {
                Position: "Software Engineer 2",
                When: "2012-2014",
                Where: "MAQ Software, Hyderabad",
                Role: "Business Application Developer",
                Responsibility: "Lead a team of 5, provided POCs, designed and developed applications",
                Technologies: ".Net, HTML, SQL, SSIS, JavaScript, jQuery, CSS3, SharePoint 2013"
            }],
            Technologies: [{
                Title: ".Net Entity Framework",
                ImgName: "entityframework.jpeg"
            }, {
                Title: "Entity Framework",
                ImgName: "entityframework.jpeg"
            },
            {
                Title: "N​ode.js",
                ImgName: "node.png"
            },
            {
                Title: "SharePoint 2013",
                ImgName: "sharepoint.png"
            },
            {
                Title: "SharePoint 2010",
                ImgName: "sharepoint2010.png"
            },
            {
                Title: "CSS3",
                ImgName: "css.png"
            },
            {
                Title: "jQuery",
                ImgName: "jquery.png"
            },
            {
                Title: "JavaScript",
                ImgName: "js.png"
            },
            {
                Title: "SSIS",
                ImgName: "ssis.png"
            },
            {
                Title: "SQL",
                ImgName: "sql.jpeg"
            },
            {
                Title: "SQL 2012",
                ImgName: "sql.jpeg"
            },
            {
                Title: "SQL 2014",
                ImgName: "sql.jpeg"
            },
            {
                Title: "MySQL",
                ImgName: "mysql.png"

            },
            {
                Title: ".N​et 4.5 Web API",
                ImgName: "webapi.png"
            },
            {
                Title: "Web API",
                ImgName: "webapi.png"
            },
            {
                Title: "ASP.Net MVC",
                ImgName: "aspmvc.png"
            },
            {
                Title: ".N​et 4.5 MVC",
                ImgName: "aspmvc.png"
            },
            {
                Title: ".N​et 3.5",
                ImgName: "net.png"
            },
            {
                Title: "​.Net 4.5",
                ImgName: "net.png"
            },
            {
                Title: ".Net",
                ImgName: "net.png"
            },
            {
                Title: ".Net 3.5",
                ImgName: "net.png"
            },
            {
                Title: ".N​et 4.5",
                ImgName: "net.png"
            },
            {
                Title: "HTML5",
                ImgName: "html.png"
            },
            {
                Title: "HTML",
                ImgName: "html.png"
            },
            {
                Title: "AngularJS",
                ImgName: "angularjs.png"
            },
            {
                Title: "SSMS",
                ImgName: "sql.jpeg"
            },
            {
                Title: "Swift 3",
                ImgName: "swift.jpeg"
            },
            {
                Title: "iOS",
                ImgName: "ios.jpg"
            },
            {
                Title: "Push notification",
                ImgName: "apn.png"
            },
            {
                Title: "Ionic",
                ImgName: "ionic.png"
            },
            {
                Title: "FireBase",
                ImgName: "firebase.png"
            },
            {
                Title: "Android",
                ImgName: "android.png"
            },
            {
                Title: "Ruby on Rails",
                ImgName: "ruby.jpeg"
            },
            {
                Title: "Java",
                ImgName: "java.png"
            },
            {
                Title: "Eclipse",
                ImgName: "eclipse.jpg"
            },
            {
                Title: "SQLite",
                ImgName: "sqlite.jpeg"
            },
            {
                Title: "Eclipse",
                ImgName: "eclipse.jpg"
            },
            {
                Title: "C++",
                ImgName: "cpp.png"
            },
            {
                Title: "OpenGL",
                ImgName: "opengl.jpg"
            }],
            Education: [{
                Degree: "Master Information Science",
                Board: "Interdisciplinary Graduate Program in Informatics",
                Institution: "University of Iowa",
                Batch: "2015-2017",
                GPA: "3.67"
            },
            {
                Degree: "Bachelor Of Engineering (Computer Science)",
                Board: "Visvesvaraya Technological University",
                Institution: "Atria Institute Of Technology, Bangalore",
                Batch: "2008-2012",
                GPA: "71.6 %"
            },
            {
                Degree: "High School (Class XII)",
                Board: "CBSE",
                Institution: "Kendriya Vidyalaya 1, Jalahalli West, Bangalore",
                Batch: "2007-2008",
                GPA: "71.6 %"
            },
            {
                Degree: "Middle School (Class X)",
                Board: "CBSE",
                Institution: "Army School 1, Ramakrishnapuram, Secunderabad",
                Batch: "2005-2006",
                GPA: "80.2 %"
            }],
            Contacts: {
                SocialMedia: [
                    {
                        Type: "LinkedIn",
                        Link: "https://www.linkedin.com/in/maheshsasidharan"
                    },
                    {
                        Type: "GitHub",
                        Link: "https://github.com/MaheshSasidharan"
                    },
                    {
                        Type: "Stackoverflow",
                        Link: "http://stackoverflow.com/users/1161370/mahesh"
                    },
                    {
                        Type: "Facebook",
                        Link: "https://www.facebook.com/mahesh.sasidharan"
                    },
                    {
                        Type: "Twitter",
                        Link: "https://twitter.com/blinddoc"
                    },
                    {
                        Type: "Google Plus",
                        Link: "https://plus.google.com/u/0/111874564643552738091/posts"
                    }
                ],
                CV: [
                    {
                        Type: "CV",
                        Link: "https://drive.google.com/open?id=0By_3UoPyNHEFYWRzYTM2TG56dmM"
                    },
                    {
                        Type: "Resume",
                        Link: "https://drive.google.com/open?id=0By_3UoPyNHEFVkpZRlYzQUJ6YjA"
                    }
                ]
            }
        }
    }
    return oConstants;
}