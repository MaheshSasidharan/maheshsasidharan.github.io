AnnualReview

.factory('Factory_Constants', [Constants])

function Constants() {
    var oConstants = {
        Miscellaneous: {
            LoadSuccessful: "{0} : Loaded successfully",
            SomethingWentWrong: "Sorry. Something went wrong.",
            InvalidDate: "Invalid Date",
            DeletedItem: "Successfully deleted item.",
            DatePicker: function () {
                this.format = 'MM-dd-yyyy';
                this.opened = false;
                this.open = function ($event) {
                    vm.date.opened = true;
                };
                this.dateOptions = {
                    formatYear: 'yyyy',
                    startingDay: 1
                }
            },
            Notification: {
                Saved: "Item Saved successfully",
                Edited: "Item Updated successfully",
                Deleted: "Item Deleted successfully",
                Removed: "Item has been removed",
                Type: {
                    Info: 'Info',
                    Danger: 'Danger',
                    Warning: 'Warning'
                }
            }
        },
        AnnualReview: {
            Popup: {
                New: 'Create a New item',
                Edit: 'Edit this item',
                Delete: 'Are you sure you want to delete?',
                SearchLNameFName: 'Search by Last name or First name'
            },
            Notification: {
                Saved: "Item Saved successfully",
                Edited: "Item Updated successfully",
                Deleted: "Item Deleted successfully",
                Type: {
                    Info: 'Info',
                    Danger: 'Danger',
                    Warning: 'Warning'
                },
                InvalidCodeName: "Please enter proper values for Code/Name",
                NoRecordFound: "No records found. Please try again with different search keywords",
                EnterSearchKeywords: "Enter Code or Name to search records"
            },
            Tabs: [
                  { link: '#/checklist', label: 'Checklist' },
                  { link: '#/externalReviewers', label: 'External Reviewers' },
                  { link: '#/rankHistory', label: 'Rank History' },
                  { link: '#/reviewHistory', label: 'Review History' }
            ],
            CheckList: {
                DropdownConfigs: {
                    optionActionType: [{
                        val: 'PRO',
                        text: 'PRO'
                    }, {
                        val: 'CON',
                        text: 'CON'
                    }, {
                        val: '5YR',
                        text: '5YR'
                    }, {
                        val: 'FUL',
                        text: 'FUL'
                    }, {
                        val: 'REA',
                        text: 'REA'
                    }, ],
                    optionsApproval: [{
                        val: 'Y',
                        text: 'Yes'
                    }, {
                        val: 'N',
                        text: 'No'
                    }],
                    optionsReivewType: [{
                        val: 'TENURE',
                        text: 'Tenure',
                    },
                    {
                        val: 'RANK',
                        text: 'Rank'
                    }]
                }
            }
        }
    }
    return oConstants;
}