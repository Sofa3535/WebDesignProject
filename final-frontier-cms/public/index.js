/** index.js
 * JavaScript for the final frontier CMS app 
 * 
 * Place your custom JavaScript in this document 
 */


//expand Article box
function expand_article_box(){
    var close_button = document.getElementById("close");
    var article = document.getElementById("article");
    if(article.className != "active"){
        article.className="active";
        close_button.style.display="inline";
    }
}

// shrink Article box
function close_article_box(){
    var article = document.getElementById("article");
    var close_button = document.getElementById("close");
    
    if(article.className =="active"){
          article.className = ""; 
        close_button.style.display = "none";
    }        
}






//expand Gallery box
function expand_gallery(){
    

    var gallerybox = document.getElementById("gallerybox");
    var image = gallerybox.getElementsByTagName("img");
    var workplease= document.getElementById("workplease");
    var close_gallery = document.getElementById("close_gallery");
    var back = document.getElementById("back");
    
    if(gallerybox.className == "inactive"){
        gallerybox.className = "active";
        workplease.className = "active";
        back.className = "";
        close_gallery.style.display="inline";
        for(var i=0; i<image.length; i++){
            image[i].style.display = "block";
        }
        //close_button.style.display="inline";
    }
}


 




function contract_gallery(){
    
    var gallerybox = document.getElementById("gallerybox");
    var image = gallerybox.getElementsByTagName("img");
    var workplease= document.getElementById("workplease");
    var close_gallery = document.getElementById("close_gallery");
var back = document.getElementById("back");
    
    if(gallerybox.className == "active"){
        gallerybox.className = "inactive";
        workplease.className = "";
        back.className = "card";
        close_gallery.style.display = "none";
        for(var i=1; i<image.length; i++){
            image[i].style.display = "none";
        }
        //close_button.style.display="inline";
    }
}




