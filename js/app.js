"uses strict";
var TableIDvalue = "example";

//
//////////////////////////////////////
var TableLastSortedColumn = -1;

function SortTable() {
    var sortColumn = parseInt(arguments[0]);
    var type = arguments.length > 1 ? arguments[1] : 'T';
    var dateformat = arguments.length > 2 ? arguments[2] : '';
    var table = document.getElementById(TableIDvalue);
    var tbody = table.getElementsByTagName("tbody")[0];
    var rows = tbody.getElementsByTagName("tr");
    var arrayOfRows = new Array();

    type = type.toUpperCase();
    dateformat = dateformat.toLowerCase();
    for (var i = 0, len = rows.length; i < len; i++) {
        arrayOfRows[i] = new Object;
        arrayOfRows[i].oldIndex = i;
        var celltext = rows[i].getElementsByTagName("td")[sortColumn].innerHTML.replace(/<[^>]*>/g, "");
        if (type == 'D') { arrayOfRows[i].value = GetDateSortingKey(dateformat, celltext); } else {
            var re = type == "N" ? /[^\.\-\+\d]/g : /[^a-zA-Z0-9]/g;
            arrayOfRows[i].value = celltext.replace(re, "").substr(0, 25).toLowerCase();
        }
    }
    if (sortColumn == TableLastSortedColumn) { arrayOfRows.reverse(); } else {
        TableLastSortedColumn = sortColumn;
        switch (type) {
            case "N":
                arrayOfRows.sort(CompareRowOfNumbers);
                break;
            case "D":
                arrayOfRows.sort(CompareRowOfNumbers);
                break;
            default:
                arrayOfRows.sort(CompareRowOfText);
        }
    }
    var newTableBody = document.createElement("tbody");
    newTableBody.setAttribute("id", "items");
    for (var i = 0, len = arrayOfRows.length; i < len; i++) {
        newTableBody.appendChild(rows[arrayOfRows[i].oldIndex].cloneNode(true));
    }
    table.replaceChild(newTableBody, tbody);
} // function SortTable()

function CompareRowOfText(a, b) {
    var aval = a.value;
    var bval = b.value;
    return (aval == bval ? 0 : (aval > bval ? 1 : -1));
} // function CompareRowOfText()

function CompareRowOfNumbers(a, b) {
    var aval = /\d/.test(a.value) ? parseFloat(a.value) : 0;
    var bval = /\d/.test(b.value) ? parseFloat(b.value) : 0;
    return (aval == bval ? 0 : (aval > bval ? 1 : -1));
} // function CompareRowOfNumbers()

function GetDateSortingKey(format, text) {
    if (format.length < 1) { return ""; }
    format = format.toLowerCase();
    text = text.toLowerCase();
    text = text.replace(/^[^a-z0-9]*/, "");
    text = text.replace(/[^a-z0-9]*$/, "");
    if (text.length < 1) { return ""; }
    text = text.replace(/[^a-z0-9]+/g, ",");
    var date = text.split(",");
    if (date.length < 3) { return ""; }
    var d = 0,
        m = 0,
        y = 0;
    for (var i = 0; i < 3; i++) {
        var ts = format.substr(i, 1);
        if (ts == "d") { d = date[i]; } else if (ts == "m") { m = date[i]; } else if (ts == "y") { y = date[i]; }
    }
    d = d.replace(/^0/, "");
    if (d < 10) { d = "0" + d; }
    if (/[a-z]/.test(m)) {
        m = m.substr(0, 3);
        switch (m) {
            case "jan":
                m = String(1);
                break;
            case "feb":
                m = String(2);
                break;
            case "mar":
                m = String(3);
                break;
            case "apr":
                m = String(4);
                break;
            case "may":
                m = String(5);
                break;
            case "jun":
                m = String(6);
                break;
            case "jul":
                m = String(7);
                break;
            case "aug":
                m = String(8);
                break;
            case "sep":
                m = String(9);
                break;
            case "oct":
                m = String(10);
                break;
            case "nov":
                m = String(11);
                break;
            case "dec":
                m = String(12);
                break;
            default:
                m = String(0);
        }
    }
    m = m.replace(/^0/, "");
    if (m < 10) { m = "0" + m; }
    y = parseInt(y);
    if (y < 100) { y = parseInt(y) + 2000; }
    return "" + String(y) + "" + String(m) + "" + String(d) + "";
} // function GetDateSortingKey()



var maxPages = 5;



    //nombre maximal de produits par page


var url = "data.json";
var urlRand = new Date().getTime(); 


$.ajaxSetup({ cache: false });
  

$.ajax({
      cache: false,
      crossDomain: true,
      type: 'POST',
      url: url,
      contentType: 'text/plain; charset=utf-8', 
      dataType: 'json', 
      success: function(data) {
          console.log('SUCESS!!!');
      },
      error: function (jqXHR, exception) {
          // Note: Often ie will give no error msg. Aren't they helpful?
          console.log('ERROR: jqXHR, exception', jqXHR, exception );
      }
}).done(function(data){

            var eg = document.getElementById("test");
            //
            eg.innerHTML = '<input type="range" min="' + data[0].price_filter.min + '" max="' + (data[0].price_filter.max + 10) + '" value="' + data[0].price_filter.max + '" class="slider" id="myRange"><p>Value: <span id="demo"></span></p>';
            var slider = document.getElementById("myRange");
            var output = document.getElementById("demo");

            output.innerHTML = slider.value;

            slider.oninput = function() {
                output.innerHTML = this.value;

            }
            console.log(data[0].results[0]);
            var totalPages = 0;

            $.each(data[0].results, function(index, value) {



                var priceNum = Number(value.price.substring(1).replace(',', ''));
                var scoreNum = Number(value.id);
                totalPages += 1;

                var record = '<tr><td>' + value.name + ' </td><td>' + '<img src="' + value.image + '"height="60" width="60">' + ' </td><td align="center">' + priceNum + ' </td><td align="center">' + scoreNum + ' </td><td>' + value.short_description + ' </td></tr>';

                if (priceNum <= slider.value) {
                    $("#items").append(record);
                }
            });
            
 //recuperate select options
            var sel = document.getElementById('scripts'); 
//listen to the choice of the number of products per page
            sel.addEventListener("change", function() {
                var opt = sel.options[sel.selectedIndex];

                maxPages = opt.value;

            
if (Number.isInteger(totalPages / maxPages)) {
    var nbrPages = totalPages / maxPages;    //nombre de pages
}
else { var nbrPages = Math.floor(totalPages / maxPages) + 1;   } //nombre de pages
              
               
                var e = document.getElementById("nbrpage");
                e.innerHTML = maxPages;
                var er = document.getElementById("dede");
                er.innerHTML = '<a class="active" id="1" href="#">1</a>';
                var h = document.getElementById("1");
    //prepare the links of the different pages according to number of products per page 
                for (var i = nbrPages; i > 1; i--) {

                    var record = '<a href="#" id="' + i + '">' + i + '</a>';

                    h.insertAdjacentHTML("afterend", record);

                }
                var empt = document.getElementById("items");
                empt.innerHTML = '';
                for (var i = 0; i < maxPages; i++) {

                    var priceNum = Number(data[0].results[i].price.substring(1).replace(',', ''));
                    var scoreNum = Number(data[0].results[i].id);

                    var record = '<tr><td>' + data[0].results[i].name + ' </td><td>' + '<img src="' + data[0].results[i].image + '"height="60" width="60">' + ' </td><td align="center">' + priceNum + ' </td><td align="center">' + scoreNum + ' </td><td>' + data[0].results[i].short_description + ' </td></tr>';
                    if (priceNum <= slider.value) {
                        $("#items").append(record);
                    }

                }
            });

            // display value property of select list (from selected option)


        if (Number.isInteger(totalPages / maxPages)) {
    var nbrPages = totalPages / maxPages;    //nombre de pages
}
else { var nbrPages = Math.floor(totalPages / maxPages) + 1;   }  
               
            var e = document.getElementById("nbrpage");
            e.innerHTML = maxPages;
            var er = document.getElementById("dede");
            er.innerHTML = '<a class="active" id="1" href="#">1</a>';
            var h = document.getElementById("1");

            for (var i = nbrPages; i > 1; i--) {
                var record = '<a href="#" id="' + i + '">' + i + '</a>';

                h.insertAdjacentHTML("afterend", record);

            }
            var empt = document.getElementById("items");
            empt.innerHTML = '';
            for (var i = 0; i < maxPages; i++) {

                var priceNum = Number(data[0].results[i].price.substring(1).replace(',', ''));
                var scoreNum = Number(data[0].results[i].id);

                var record = '<tr><td>' + data[0].results[i].name + ' </td><td>' + '<img src="' + data[0].results[i].image + '"height="60" width="60">' + ' </td><td align="center">' + priceNum + ' </td><td align="center">' + scoreNum + ' </td><td>' + data[0].results[i].short_description + ' </td></tr>';
                if (priceNum <= slider.value) {
                    $("#items").append(record);
                }

            }

            slider.addEventListener("change", function() {

                var el = document.getElementById("items");
                el.innerHTML = '';
                for (var i = 0; i < maxPages; i++) {

                    var priceNum = Number(data[0].results[i].price.substring(1).replace(',', ''));
                    var scoreNum = Number(data[0].results[i].id);

                    var record = '<tr><td>' + data[0].results[i].name + ' </td><td>' + '<img src="' + data[0].results[i].image + '"height="60" width="60">' + ' </td><td align="center">' + priceNum + ' </td><td align="center">' + scoreNum + ' </td><td>' + data[0].results[i].short_description + ' </td></tr>';
                    if (priceNum <= slider.value) {
                        $("#items").append(record);
                    }

                }



            });

        });


