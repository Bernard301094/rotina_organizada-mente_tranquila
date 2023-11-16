
(function( $ ){


	/* ----------------------------------------------------------- */
	/*  1. FIXED MENU
	/* ----------------------------------------------------------- */


		jQuery(window).bind('scroll', function () {
    		if ($(window).scrollTop() > 150) {

		        $('#mu-header').addClass('mu-fixed-nav');
		        
			    } else {
			    $('#mu-header').removeClass('mu-fixed-nav');
			}
		});

		
	/* ----------------------------------------------------------- */
	/*  2. MENU SMOOTH SCROLLING
	/* ----------------------------------------------------------- */ 

		//MENU SCROLLING WITH ACTIVE ITEM SELECTED

		// Cache selectors
		var lastId,
		topMenu = $(".mu-menu"),
		topMenuHeight = topMenu.outerHeight()+13,
		// All list items
		menuItems = topMenu.find('a[href^=\\#]'),
		// Anchors corresponding to menu items
		scrollItems = menuItems.map(function(){
		  var item = $($(this).attr("href"));
		  if (item.length) { return item; }
		});

		// Bind click handler to menu items
		// so we can get a fancy scroll animation
		menuItems.click(function(e){
		  var href = $(this).attr("href"),
		      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+22;
		  jQuery('html, body').stop().animate({ 
		      scrollTop: offsetTop
		  }, 1500);
		  e.preventDefault();
		});

		// Bind to scroll
		jQuery(window).scroll(function(){
		   // Get container scroll position
		   var fromTop = $(this).scrollTop()+topMenuHeight;
		   
		   // Get id of current scroll item
		   var cur = scrollItems.map(function(){
		     if ($(this).offset().top < fromTop)
		       return this;
		   });
		   // Get the id of the current element
		   cur = cur[cur.length-1];
		   var id = cur && cur.length ? cur[0].id : "";
		   
		   if (lastId !== id) {
		       lastId = id;
		       // Set/remove active class
		       menuItems
		         .parent().removeClass("active")
		         .end().filter("[href=\\#"+id+"]").parent().addClass("active");
		   }           
		})

	/* ----------------------------------------------------------- */
	/*  5. MOBILE MENU CLOSE 
	/* ----------------------------------------------------------- */ 

		jQuery('.mu-menu').on('click', 'li a', function() {
		  $('.mu-navbar .in').collapse('hide');
		});



	
	
})( jQuery );


// Función para obtener o establecer la cantidad de visitas
function contarVisitas() {
    // Verificar si la cookie 'visitas' ya está presente
    if (document.cookie.indexOf('visitas=') >= 0) {
        // La cookie ya existe, obtenemos el valor actual y lo incrementamos
        var visitas = parseInt(getCookie('visitas')) + 1;
        // Actualizamos la cookie con el nuevo valor
        document.cookie = 'visitas=' + visitas;
        return visitas;
    } else {
        // La cookie no existe, establecemos la cantidad de visitas a 1
        document.cookie = 'visitas=1';
        return 1;
    }
}

// Función para obtener el valor de una cookie por nombre
function getCookie(nombre) {
    var nombreEQ = nombre + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) === ' ') cookie = cookie.substring(1, cookie.length);
        if (cookie.indexOf(nombreEQ) === 0) return cookie.substring(nombreEQ.length, cookie.length);
    }
    return null;
}

// Llamada a la función para contar las visitas y mostrar el resultado en la consola
console.log('Número total de visitas: ' + contarVisitas());
