$(document).ready(function () {
    $.getJSON("api/employee.json", function (feed) { // Include JSON direct in file without AJAX for the first time page load.

        var getCompanyName = feed.company;
        var getTeam = feed.company.teams;
        var getEmployee = feed.company.teams;

        var obj_company = new company();
        obj_company.addTeam(".team");

        function company() {
//            Add Team
            this.addTeam = function (team) {
                var countTeam = $(getTeam).size();

                $(team + " input").click(function (event) {
                    event.stopPropagation();
                    $(team + " .list-box li").remove();
                    for (var i = 0; i < countTeam; i++) {
                        $(team + " .list-box").append('<li accesskey="' + i + '">' + getTeam[i].team + '</li>');
                    }
                    $(team + " .list-box").show();

                    $(team + " .list-box li").click(function () {
                        var getVal = $(this).text();
                        var getKey = $(this).attr('accesskey');
                        $(team + " .list-box").hide();
                        $(team + " input").val(getVal);
                        $(team + " input").attr('accesskey', getKey);

                        obj_company.addEmployee(getKey, ".employee");
                    });
                });

            };
//            Add employee base on team
            this.addEmployee = function (key, employee) {
                var countEmployee = $(getEmployee[key].employees).size();
                $(employee + " .list-box li").remove();

                for (var i = 0; i < countEmployee; i++) {
                    $(employee + " .list-box").append('<li accesskey="' + i + '">' + getEmployee[key].employees[i].name + '</li>');
                    $(employee + " .list-box li:eq(" + i + ")").attr('accesskey', getEmployee[key].employees[i].id);
                    ;
                }

                $(employee + " input").click(function () {
                    event.stopPropagation();
                    $(employee + " .list-box").show();

                    $(employee + " .list-box li").click(function () {
                        var getVal = $(this).text();
                        var getKey = $(this).attr('accesskey');
                        $(employee + " .list-box").hide();
                        $(employee + " input").val(getVal);
                        $(employee + " input").attr('accesskey', getKey);
                    });
                });
            };



        }

//        Global Function
        var obj_global = new global();
        obj_global.hide_dropdown(".list-box");
        function global() {
//            Hide Dropdown
            this.hide_dropdown = function (dropdown) {
                $("html").click(function () {
                    $(dropdown).hide();
                });
            };
        }

    });
});