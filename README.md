# VisayaCodeChallenge2
Second cold assessment in Visaya Code Challenge 


#################################################################<br>
## what we know

Build a product listing based on data from the following endpoint: 
 
https://visaya.solutions/en/rest/V1/visaya/search/devices/?categories[]=51&order_by=s
core&order=desc&current_page=1&per_page=5  
[output type is dependant on your request headers, if you prefer JSON, that’s also an 
option] 
 
The product list should be filterable by the attributes listed below, in this case you just 
need to add additional attributes to your query string: 
 
- Slider [min 0, max 6500] 
- Price range:

from_price=0&to_price=940 

(values in EUR) 
- Checkboxes 
- GF Piping Systems products only: manufacturer[]=1714 
- Coriolis: measurement_technology_paramet[]=274 
- Chemical applications: industry_or_application[]=424 
 
The list should be paginated and orderable by score,name and price. It should work on IE11 as well and be responsive.

## What we tried to do

The user interface is elementary, as I tried just to put the most of the insctructions mentioned in the task.
The code just need to be executed with a server-side javascript to intergate javascript code in the webpage, like Apache or eclipse e4.<br>
The principle page is index.html present in racine of the repository. <br>
The list of the exclusions is automatically recuperated from the JSON file, same case for the rest of data.<br>
I used WampServer to implement my code, but it still works with any Web development platform on windows, MacOs or Linux. <br>
the code support all recent browsers, internet explorer 11 included.
we just have to make some modifications to be well displayed in Internet explorer 11 browser: <br>
● Use a specific form to load JSON file (as shown in the code). <br>
● Disable cache for AJAX  with this insctruction $.ajaxSetup({ cache: false }); <br>
● Use PSOT request with  contentType: 'text/plain .<br>

The Slider read automatically the most expensive price of the prodcuts and put it in the max number after adding 10 (it means 10 euros), the minimum is also detected from the values of prices in the JSON file.

Unfortunately, I can't see the meaning of the checkboxes anf the values mentioned on it, otherwise, it would be easy to add chckboxes to control the products shown on the table. 




