function MenuChoice()
{
    
    if (document.getElementById("menu").value == "ShowSection1") 
    {
        document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
        getAllCategories();
    }
    if (document.getElementById("menu").value == "ShowSection2")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "visible";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    if (document.getElementById("menu").value == "ShowSection3")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "visible";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    if (document.getElementById("menu").value == "ShowSection4")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "visible";
        document.getElementById("section5").style.visibility = "hidden";
    }
    
     else if ((document.getElementById("menu").value == "ShowSection5"))
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hiddem";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "visible";
    }
}

function getAllCategories()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCategories";
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.status == 200)
        {
            
 
            if (objRequest.responseText !== null && objRequest.responseText !== "")
            {
                var output = JSON.parse(objRequest.responseText);
                GenerateOutput(output);
            }
        }   
     };
     
    //Inititate server request
    objRequest.open("GET", url, true);
    objRequest.send();
}

function GenerateOutput(result)
{
    
    var count = 0;
    var categoryTableText = "<table><th>Category ID</th><th>Category Name</th><th>Category Description</th>";
    
    
    //Loop to extract the data from response object
    for (count = 0; count < result.GetAllCategoriesResult.length;count++)
    {
        categoryTableText += "<tr><td>" + result.GetAllCategoriesResult[count].CID + "</td>";
        categoryTableText += "<td>" + result.GetAllCategoriesResult[count].CName + "</td>";
        categoryTableText += "<td>" + result.GetAllCategoriesResult[count].CDescription + "</td></tr>";
    }
    
    categoryTableText += "</table>";
    
    document.getElementById("categorylist").innerHTML = categoryTableText;   
 }

function CreateCategory()
{
    var objRequest = new XMLHttpRequest();
    var url = 'https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCategory';
    
    //Collect Category data from the web page
    var categoryname = document.getElementById("catname").value;
    var categorydescription = document.getElementById("catdescription").value;
    
    //Create parameter string
    var newcategory = '{"CName":"' + categoryname + '", "CDescription":"' + categorydescription + '"}';
    
    //Checking for AJAx operation return
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult(result);      
        }
    };
    
    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcategory);
    
}

function OperationResult(output)
{
    if (output.WasSuccessful == 1)
    {
        document.getElementById("result").innerHTML = "The operation was successful!";
    }
    else
    {
        document.getElementById("result").innerHTML = "The operation was not successful" + "<br>" + output.Exception;
    }
}

function ChangeCategory()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
    
     //Collect Customer data from the web page
    var changecategoryid = document.getElementById("changecategoryid").value;
    var changecategorydescription = document.getElementById("changecategorydescription").value;
    
    //Create parameter string
    var parameters = '{"CID":"' + changecategoryid + '","CDescription":"' + changecategorydescription +'"}';
    
    //Checking for AJAx operation return
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult2(result);      
        }
    };
    
    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(parameters);

}
    
    function OperationResult2(output)
{
    if (output.WasSuccessful == 1)
    {
        document.getElementById("result2").innerHTML = "The operation was successful!";
    }
    else
    {
        document.getElementById("result2").innerHTML = "The operation was not successful" + "<br>" + output.Exception;
    }
}

function DeleteCategory()
{

    var r = confirm("Are you sure you want to delete category?");
    if (r == true) {
           
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
    
    //Collect Category ID from web page
    var categoryid = document.getElementById("categoryid").value; 
    
    url += categoryid;
    
    //Checking for AJAx operation return
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult3(result);      
        }
    };
    
    //Start AJAX request
    objRequest.open("GET", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send();
    
    }
    else
    {alert("You pressed cancel.");}
}
    function OperationResult3(output)
{
    if (output.DeleteCategoryResult.WasSuccessful == 1)
    {
        document.getElementById("result3").innerHTML = "The operation was successful!";
    }
    else
    {
        document.getElementById("result3").innerHTML = "The operation was not successful" + "<br>" + output;
    }
}