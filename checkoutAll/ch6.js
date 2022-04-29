var dmlscript = document.createElement("script");
dmlscript.src = "https://http2.mlstatic.com/storage/bmsdk/js/dml-0.0.7.min.js";
dmlscript.onload = function(){
    new DMLSDK({
        publicKey: "APP_USR-3ea4577a-2bd8-4842-8724-d1ecbd6c1eda",
        out: "vtex.deviceFingerprint"
    });
}
document.body.appendChild(dmlscript);

// todas las páginas:
var script1 = document.createElement('script');
script1.setAttribute('src','https://cloudfront.barilliance.com/beautyholics.com/cbar.js.php');
document.head.appendChild(script1);




(function($) {
    $.fn.inputFilter = function(inputFilter) {
      return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        }
      });
    };
  }(jQuery));
  
  (function($) {
    $.fn.changes = function(cb, e) {
      e = e || { subtree:true, childList:true, characterData:true };
      $(this).each(function() {
        function callback(changes) { cb.call(node, changes, this); }
        var node = this;
        (new MutationObserver(callback)).observe(node, e);
      });
    };
  })(jQuery);
  
  
  var checkoutState = "default";
  var medioEntrega = "";
  var restoreState = "default";
  
  
  var checkoutFunctions = function(){
      var init = function(){
          generalTextChange();
          cerow();
      };
      var generalTextChange = function(){
  
          // Restricts input for each element in the set of matched elements to the given inputFilter.
          if(!$("#cart-coupon").hasClass("ready")){
              $(".coupon-value").attr("placeholder","Ingresa aquí­ el código de tu cupón");
              $("#client-pre-email").attr("placeholder","TUNOMBRE@CORREO.COM");
              $("#cart-coupon").addClass("ready");
          }
          if($(".legalCoupon").length == 0){
              $('<span class="legalCoupon">*Asegúrate que se aplique el descuento antes de finalizar tu compra</span>').insertAfter("#cart-coupon");
          }
          if(!$(".emailInfo h3").hasClass("ready")){
              $("<h3 class='saveDataEmail'>GUARDAMOS TUS DATOS DE MANERA <strong>100% SEGURA</strong><h3>").insertBefore(".emailInfo");
              $(".emailInfo h3").addClass("ready");
          }
  
          $("#client-document, #client-phone").inputFilter(function(value) {
            return /^\d*$/.test(value);
          });
  
          // Texto Correo
          var cambioPlaceholderCorreo = setInterval(function(){
              if( $('#client-pre-email')[0] ){
                  clearInterval(cambioPlaceholderCorreo);
                  $("#client-pre-email").attr("placeholder","tunombre@correo.com");
              }
          },100);
  
          // Texto Correo
          var cambioPlaceholderCupon = setInterval(function(){
              if( $('#cart-coupon')[0] ){
                  clearInterval(cambioPlaceholderCupon);
                  $("#cart-coupon").attr("placeholder","Ingresa aquí­ el código de tu cupón");
              }
          },100);
  
          function intervalDiscounts(){
              var cambioHayDescuento = setInterval(function(){
                  if( $('.body-cart .totalizers-list .Discounts')[0] ){
                      clearInterval(cambioHayDescuento);
                      $("#cart-to-orderform").addClass("carthasDiscount");
                      $(".cart-template").addClass("marginCartDiscount");
                      
                  }
              },100);
          }intervalDiscounts();
  
          $(document).on("click", "#cart-coupon-remove", function(){
              var cambioNoHayDescuento = setInterval(function(){
                  if( !($('.body-cart .totalizers-list .Discounts')[0]) ){
                      clearInterval(cambioNoHayDescuento);
                      $("#cart-to-orderform").removeClass("carthasDiscount");
                      $(".cart-template").removeClass("marginCartDiscount");
                      intervalDiscounts(); 
                  }
              },100);
          });
  
  
          $(document).on("click", ".btnCloseRegalo", function(){
              $(this).html('Confirmar datos <div class="checkInputs"></div>'); 
          });
  
          var inputsEmpaqueRegalo = setInterval(function(){
              if( $('.body-cart .item-attachments-content')[0] ){
                  clearInterval(inputsEmpaqueRegalo);
                    $(".item-attachments-content .item-attachments-item-fields .item-attachment").each(function(){
                      var labelText = $(this).find("label").text();
                      $(this).find("textarea").attr("placeholder",labelText);
                    });
  
                    if ( !($(".item-attachments-item-fields .btnCloseRegalo")[0]) ) {
                      $(".item-attachments-item-fields").append('<div class="btnCloseRegalo">Confirmar datos</div>');
                      $(".item-attachments-item-fields").append('<div class="regaloLabel1">Será una tarjeta impresa y se entregará junto al regalo</div>');
                    }
                    if ( !($(".labelMensajeRegalo")[0]) ) {
                      $(".item-attachment-name-mensaje").append('<div class="labelMensajeRegalo">Será¡ una tarjeta impresa y se entregará¡ junto al regalo</div>');
                    }
  
  
  
              }
          },1000);
  
          var cambioTextoTipoEnvio = setInterval(function(){
              if( $('#change-other-shipping-option')[0] ){
                  clearInterval(cambioTextoTipoEnvio);
                  $("#change-other-shipping-option").text("Enviar a otra dirección");
              }
          },1000);
  
  
          var addServiceSet = setInterval(function(){
              if( $('.body-cart .add-service-container')[0] ){
                  clearInterval(addServiceSet);
                  console.log("habia un trigger");
                  $(".add-service").trigger('click');
              }
          },500);
  
          var addRestoreStore = setInterval(function(){
              if( $('.body-cart .cart-template .cart')[0] ){
                  clearInterval(addRestoreStore);
                  if ( !($('.body-cart .cart-template .cart .goShopFromCart')[0] ) ) {
                      $('.body-cart .cart-template .cart').append('<a class="goShopFromCart" href="/">Seguir comprando</a>');
                  }
              }
          },1000);
  
          var ifenvioExist = setInterval(function(){
              if( $('.body-cart .totalizers-list tr')[0] ){
                  clearInterval(ifenvioExist);
                  if ( $('.body-cart .totalizers-list tr').length == 4 ) {
                      $("#cart-to-orderform").addClass("HasEnvio");
                  }
              }
          },1000);
          
          // add gift box event handlerer
          $(document).on("change", "#addBox", function () {
            this.checked ?
                $.ajax({
                    url: "/checkout/cart/add?sku=3424&qty=1&seller=1&redirect=false&sc=1",
                    method: "GET",
                    success: function () {
                        window.location.reload();
                    },
                    error: function (e) {
                        console.log(e);
                    },
                }) :
                $("#item-remove-3424").trigger("click");
            }),
            $("#item-remove-3424")[0] && $(".cart-select-gift-placeholder").hide();
            $("#item-remove-3424")[0] || $(".cart-select-gift-placeholder").show();
          };
      var detectUrl = function(){
          if(window.location.hash) {
                var thishash = window.location.hash;
                thishash = thishash.replace('#/', '');

                var body_class = '';

                $('body').removeClass('body-cart').removeClass('body-email').removeClass('body-profile')
                       .removeClass('body-shipping').removeClass('body-payment');
              
                var ventana = $(window).width();

              if( window.location.hash == "#/cart" ){
                  $('.addCheckoutProduct').css('display','block');
                  $(".resumePurchase").text("Resumen de la compra");
                  body_class = 'body-cart';
              }
              if( window.location.hash == "#/profile" ){
                  $('.addCheckoutProduct').css('display','none');
                  $(".resumePurchase").text("Ingresa tu correo electrónico");
                  body_class = 'body-profile';
              }
              if( window.location.hash == "#/email" ){
                  thishash="profile";
                  $('.addCheckoutProduct').css('display','none');
                  $(".resumePurchase").text("Ingresa tu correo electrónico");
                  body_class = 'body-email';
              }
              if( window.location.hash == "#/shipping" ){
                $('.addCheckoutProduct').css('display','none');
                  $(".resumePurchase").text("Datos de enví­o y facturación");
                  body_class = 'body-shipping';
              }
              if( window.location.hash == "#/payment" ){
                $('.addCheckoutProduct').css('display','none');
                  $(".resumePurchase").text("Finalizar compra");
                  body_class = 'body-payment';
              }

              $('body').addClass(body_class);

              $('.breadcrumCheckout div').removeClass('active');
              $('.breadcrumCheckout div#step-'+thishash).addClass('active');
          }
      };  
      var cerow = function(){
          if(!$(".new-product-price").hasClass("ready")){
              $(".new-product-price,.total-selling-price,.monetary,.sla-value").each(function(){
                  $(this).addClass("ready");
                  var precio = $(this).text().replace(/,[^,]+$/, "");
                  $(this).text(precio);
              });
              $(".new-product-price").addClass("ready");
          }
      };
  
      var active_coupon = function(){
          if($('#show-gift-card-group')[0] && !$('#gift-card-section')[0]){
              $('#show-gift-card-group').trigger('click')
              $('#show-gift-card-group').addClass('clicked')
          }   
      }
  
      var messagesCupon = {
        'noCupon':'',
        'withCupon':'Total a pagar:'
      }
      var textCupon = function(){
        $('.container-order-form .accordion-body .accordion-inner .textMonetaryAfterCoupon').remove();
        var discount = $('.payment-discounts-list table tbody .number').text();
            discount = discount.replace('$','').replace(".", "").replace(',00','').trim()
            discount = parseInt(discount)
        var price = $('.accordion-inner tfoot .monetary').first().text();
            price = price.replace('$', '').replace(".", "").replace(',00','').trim()
            price = parseInt(price);
        var $result = discount - price;
        var $text_couponDis = '<td class="textMonetaryAfterCoupon" style="text-align: center;display: block;font-weight: bold;margin-top: 18px;"> </td>' 
        $('.container-order-form .accordion-body .accordion-inner').css('margin-top','10px').append($text_couponDis)
        if(discount > 0 ){
          var $result = discount - price;
          $result = Math.abs($result);
  
          console.log( $result );
  
          $('.container-order-form .accordion-body .accordion-inner .textMonetaryAfterCoupon').text(messagesCupon.withCupon + ' ' + toMoney($result, '$'))
        }else{
          $('.container-order-form .accordion-body .accordion-inner .textMonetaryAfterCoupon').text(messagesCupon.noCupon);
        }
      }
  
      function get_info_skus( product_id,callback ){
        var settings_ajax = {
            url : '/api/catalog_system/pub/products/search?fq=productId:' + product_id,
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }

        $.ajax( settings_ajax )
        .done( function( response ){
            callback( response[0] )
        } )
        .error( function(error){
            console.log('error search skus',error)
        } )
      }

      function print_colors_producto_checkout( info_producto ){
          console.log('info producto',info_producto)
          $('.super-container-banner-checkout .container-colors .color').addClass('no-visible')

          info_producto.items.forEach(function( sku ){
              if(sku.sellers[0].commertialOffer.AvailableQuantity > 0){
                var ex_color = $('.super-container-banner-checkout .container-colors .color:first').clone();
                $(ex_color).css('background-color',sku.Tonos[0]);
                $(ex_color).attr('data-sku',sku.itemId)
                $(ex_color).removeClass('no-visible');

                $(ex_color).appendTo($('.super-container-banner-checkout .container-colors'))
              }
              
          })

          $('.super-container-banner-checkout .container-colors .color').click(function(){
            $('.super-container-banner-checkout .container-colors .color').removeClass('selected')
            $(this).addClass('selected')
          })

          /*$('.producto-agregar-sku-checkout').click(function(){
            var skuId = $('.super-container-banner-checkout .container-colors .color.selected').attr('data-sku')
            $.ajax({
                url :'/checkout/cart/add?sku='+ skuId + '&qty=1&seller=1&redirect=false&sc=1',
                method:'GET',
                success: function(){
                    window.location.reload();
                },
                error: function(error){
                    console.log(error);
                },
            });
          })*/

      }

      function bannerCompra(){
          if($('.banner-checkout')[0]){

            get_info_skus($('.super-container-banner-checkout').attr('data-product-id'),function(response){
                print_colors_producto_checkout( response )
            })
            
              /*$('.banner-checkout').click(function(){
                  var skuId = $(this).attr('data-sku')
  
                  $.ajax({
                      url :'/checkout/cart/add?sku='+ skuId + '&qty=1&seller=1&redirect=false&sc=1',
                      method:'GET',
                      success: function(){
                          window.location.reload();
                      },
                      error: function(error){
                          console.log(error);
                      },
                  });
              })*/
          }
      }
  
      return{
          init : init,
          generalTextChange:generalTextChange,
          cerow:cerow,
          detectUrl:detectUrl,
          active_ever_coupon:active_coupon,
          textCupon:textCupon,
          bannerCompra : bannerCompra
      }
  }();
  
  $('body').changes(function(){
    
      if($('#show-gift-card-group')[0] && !$('#gift-card-section')[0])
          checkoutFunctions.active_ever_coupon()
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
          if($('.form-page.client-pre-email')[0]){
              if($('.form-page.client-pre-email').css('display') == 'block'){
                  $('.orderform-template').addClass('active-pre-email-user')
              }
              else{
                  $('.orderform-template').removeClass('active-pre-email-user')
              }
          }
      }
  })
  
  
  $(document).ajaxStop(function(){
      checkoutFunctions.textCupon();
  })
  
  
  $(document).ready(function(){
      checkoutFunctions.init();
      checkoutFunctions.detectUrl();
      checkoutFunctions.cerow();
      checkoutFunctions.textCupon();
      checkoutFunctions.bannerCompra()
  });
  
  $(window).load(function(){
      checkoutFunctions.cerow();
      checkoutFunctions.generalTextChange();
      checkoutFunctions.textCupon();
 
      var ifUserLoged = setInterval(function(){
          if( $('.client-profile-email .email')[0] ){
              clearInterval(ifUserLoged);
              var userLogged = $('.client-profile-email .email').text();
  
              var htmlModalLogged = '';
                  htmlModalLogged += '<div class="modaluserLogged" style="display: none">';
                  htmlModalLogged +=  '<div class="centerModalLogged">';
                  htmlModalLogged +=      '<div class="rel">';
                  htmlModalLogged +=          '<div class="center">';
                  htmlModalLogged +=              '<div class="windowUserLogged">';
                  htmlModalLogged +=                  '<div class="absoluteModalnew">';
                  htmlModalLogged +='<div class="rel">';
                  htmlModalLogged +=  '<div class="center">';
                  htmlModalLogged +=      '<h3>Hola, ¿<strong>'+userLogged+'</strong> es tu correo electrónico?</h3>';
                  htmlModalLogged +=      '<div class="btnContinueShop">Si, continuar</div>';
                  htmlModalLogged +=      '<div class="btnNoContinueShop">No, acceder con otro usuario</div>';
                  htmlModalLogged +=  '</div>';
                  htmlModalLogged +='</div>';
                  htmlModalLogged +=                  '</div>';
                  htmlModalLogged +=                  '<img src="/arquivos/log-in.png" class="imgDummModalNew">';
                  htmlModalLogged +=                  '<div class="CloseModalNew">x</div>';
                  htmlModalLogged +=              '</div>';
                  htmlModalLogged +=          '</div>';
                  htmlModalLogged +=      '</div>';
                  htmlModalLogged +=  '</div>';
                  htmlModalLogged += '</div>';
              $("body").append(htmlModalLogged);
          }
      },1000);
  
      function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
      }
  
      $(document).on("click", ".btnNoContinueShop", function(){
          var idUserCookie = getCookie("checkout.vtex.com");
          var deletStringId = "__ofid=";
              idUserCookie = idUserCookie.replace( deletStringId, idUserCookie );
          console.log(idUserCookie);  
      });
  
  
  
      $(document).on("click", ".goShopFromCart", function(evt){
          if (document.referrer.indexOf(window.location.host) !== -1){
               history.go(-1); // history.back();
              //window.open( location.protocol+'//'+ window.location.host,"_self" );
          }else{
              evt.preventDefault();
              window.open( location.protocol+'//'+ window.location.host,"_self" );
          }
      });
  
  
  
  });
  
  $(document).ajaxStop(function(){
      checkoutFunctions.init();   
      checkoutFunctions.cerow();
  });
  
  $(window).on('hashchange', function(){
      setTimeout(function(){
          checkoutFunctions.cerow();
          checkoutFunctions.detectUrl();
  
          $("#ship-street, #ship-more-info").attr('maxlength','40');
          $(document).on('focus',"#ship-street, #ship-more-info", function() {
                if ( $(this).val().length > 39) {
                  console.log("es mas de 100");
                  var str = $(this).val();
                  var res = str.substring(0, 39);
                  $(this).val(res);
                }
            }).on('blur',"#ship-street, #ship-more-info", function() {
                if ( $(this).val().length > 39) {
                  console.log("es mas de 100");
                  var str = $(this).val();
                  var res = str.substring(0, 39);
                  $(this).val(res);
                }
            }); 
  
      },800); 
  });
  
  $(window).load(function() {  
    // Limit Inputs
    console.log("limit");
    $("#ship-street, #ship-more-info").attr('maxlength','40');
  
    $(document).on('focus',"#ship-street, #ship-more-info", function() {
        if ( $(this).val().length > 39) {
          console.log("es mas de 100");
          var str = $(this).val();
          var res = str.substring(0, 39);
          $(this).val(res);
        }
    }).on('blur',"#ship-street, #ship-more-info", function() {
        if ( $(this).val().length > 39) {
          console.log("es mas de 100");
          var str = $(this).val();
          var res = str.substring(0, 39);
          $(this).val(res);
        }
    });

    $(document).on("click", ".checkedVale", function(){
        jQuery(this).addClass('disable');
        jQuery('.link.link-gift-card, .gift-card-section').addClass('active');
    });
  
  });
var zipcodesAvailables = ['54003', '50006', '20011', '17013', '85010', '44035', '76020', '47030', '73026', '76036', '17042', '05045', '47053', '17050', '68051', '05051', '13052', '63001', '73055', '23068', '08078', '52079', '05079', '68077', '68079', '68081', '13074', '08001', '20045', '05088', '11001', '20060', '68001', '76109', '70110', '76111', '76113', '68121', '76122', '73124', '25126', '13140', '63130', '05129', '15131', '76001', '19142', '08137', '41132', '23090', '08141', '76130', '13160', '05147', '05148', '13001', '76147', '05154', '23162', '23991', '52240', '73168', '25175', '47170', '05172', '20175', '17174', '23182', '15176', '25183', '47189', '23189', '63190', '13222', '20013', '25200', '86219', '52203', '15204', '54206', '05212', '20238', '19212', '70215', '25214', '70221', '15224', '54001', '50226', '68229', '20228', '44090', '44098', '66170', '15238', '47245', '54245', '76248', '20250', '05266', '73268', '25269', '63272', '73275', '18001', '19290', '76275', '68276', '44279', '73283', '50287', '47288', '25286', '25290', '25295', '08296', '20295', '41298', '41306', '76306', '25307', '05308', '68307', '20310', '50313', '76318', '25320', '47318', '50318', '73319', '70265', '05318', '66318', '13300', '41349', '73001', '52356', '05360', '76364', '08372', '23350', '25377', '05376', '52378', '17380', '05380', '20383', '20400', '17388', '20621', '54398', '63401', '05400', '52399', '76400', '25402', '76403', '66400', '68406', '50400', '73408', '73411', '23417', '23419', '70418', '54405', '08421', '25430', '13430', '44430', '70429', '08433', '08436', '44560', '20443', '17001', '17433', '05440', '73443', '17442', '17446', '05001', '73449', '19450', '50330', '19455', '86001', '68464', '13468', '15469', '23466', '63470', '23001', '85162', '13473', '70473', '25473', '15476', '73461', '05480', '73483', '05490', '41001', '15491', '13490', '47460', '76497', '54498', '68500', '15500', '68502', '86320', '73504', '17513', '20517', '15516', '17524', '08520', '76520', '54518', '68547', '52001', '20550', '17541', '13268', '66001', '19548', '47258', '08549', '41551', '47551', '23555', '47555', '68255', '08558', '08560', '19001', '76563', '73563', '23570', '68572', '86568', '15572', '86569', '08573', '50450', '23574', '86571', '86573', '23580', '50577', '50590', '19573', '52585', '73585', '27001', '63594', '66594', '15600', '13580', '08606', '50606', '47268', '05607', '25612', '20614', '13600', '44001', '05615', '68615', '17614', '17616', '76622', '25260', '08634', '08638', '05631', '15632', '15638', '23660', '17653', '47675', '73671', '63690', '15646', '70670', '41668', '20710', '23672', '54670', '05649', '20750', '86755', '68679', '68682', '23682', '95001', '50683', '44650', '20770', '50689', '86757', '13670', '52693', '70717', '76670', '52694', '23686', '47707', '13673', '47001', '66682', '15693', '13688', '19698', '86760', '08685', '05697', '76736', '25740', '86749', '25745', '13744', '70001', '25754', '15759', '08758', '25758', '15762', '15764', '15763', '08770', '25769', '17777', '15776', '25785', '20787', '52786', '85410', '47798', '25799', '54800', '15806', '23807', '41807', '15808', '13810', '25817', '70820', '70823', '76823', '08832', '76834', '52835', '15001', '13836', '05837', '15837', '25843', '76845', '44847', '08849', '23855', '20001', '68861', '73861', '15407', '54874', '17873', '13873', '85440', '68872', '25873', '50001', '25875', '50711', '05893', '85001', '76892', '13894', '76895', '25899', '54261']

var html_custom_address = '<p class="input ship-state required text tipo-via customAddresConstructor">\
        <label for="ship-state">Tipo de ví­a</label>\
        <select name="tipo-via" id="Tipo-via" class="input-large">\
              <option value="" disabled=""></option>\
              <option value="APTDO">Apartado aéreo</option>\
              <option value="AUT">Autopista</option>\
              <option value="AVE">Avenida</option>\
              <option value="CL">Calle</option>\
              <option value="CR">Carrera</option>\
              <option value="CIR">Circular</option>\
              <option value="CRV">Circunvalar</option>\
              <option value="KM">Kilometro</option>\
              <option value="DG">Diagonal</option>\
              <option value="MZ">Manzana</option>\
              <option value="TV">Transversal</option>\
          </select></p>\
            <p class="input ship-street required text">\
          <label for="ship-street"> .  </label>\
          <input class="input-xlarge numeral1" maxlength="10" id="Calle">\
          <label class="text-di">#</label>\
          <input class="input-xlarge numeral1" maxlength="10" id="numero1">\
          <label class="text-di">-</label>\
          <input class="input-xlarge numeral1" maxlength="10" id="numero2">\
          </p>';
function simulateEvent(id_string, new_value){
    console.log(id_string, new_value);
    //simular cambio del estado
    var input = document.getElementById(id_string); 
    if ( input ) {
        var lastValue = input.value;
        input.value = new_value;
        var event = new Event('input', { bubbles: true });
        event.simulated = true;
        var tracker = input._valueTracker;
        if (tracker) {
            tracker.setValue(lastValue);
        }
        input.dispatchEvent(event);
        //simular cambio del estado
    }
}
var currentZipCode = ''; 

var convertPrice = function(price){
return price.replace(/.*\$/, "").replace(",00", "").replace(".", "");
}
function toMoney(str, currency_sign){
currency_sign = currency_sign || '$';
var current = Number(str.toString().replace(/[^0-9.]/g, ''));
var formatted = current.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
return currency_sign + formatted;
}

// function that show separate shipping seller
function separateShipping(){
    const { checkout: { orderForm: { sellers = [],items = [],shippingData: { logisticsInfo } = {} } = {} }  } = vtexjs;
    return (sellers || []).map(item => {
      const {id: idSellers, name: nameSeller} = item;
      const products = items.filter(({seller: idProducts}) =>  idProducts === idSellers );
      const valueShipping = (products || []).map(({id},i) => {
        const { selectedSla,slas } =  logisticsInfo.find(({ itemId }) => itemId === id);
        const { price } = slas.find(({id}) => id === selectedSla);
        return price/100;
      });
      return { id: idSellers, nameSeller, products, valueShipping };
    }).map(product => ({...product,valueShipping: product.valueShipping.reduce((a, b) => a + b)}));
}

// Function that print separate shipping in Checkout
function printSeparateShipping() {
    const valueShipping = separateShipping();
    if (valueShipping.length>0){
        $.each(valueShipping,function(index,value){
            var nombreSeller;
    if (value.nameSeller == 890905032){
            nombreSeller = "BeautyHolics"
        } else if (value.nameSeller == 9013898409){
            nombreSeller = "Mind Naturals"
        } else if (value.nameSeller == 8909358846){
            nombreSeller = "Dermatológica"
        } else if (value.nameSeller == 9010747802){
            nombreSeller = "One Way"
        } else if (value.nameSeller == 10376500914){
            nombreSeller = "Atypical"
        } else if (value.nameSeller == 9010341938){
            nombreSeller = "Vibes"
        };
            $(".srp-summary-result").before(`
                <tr>
                    <td class="info" style="font-weight: 400;text-transform: none;">
                        <span class="titleSprtShip">Costo envío:</span> ${nombreSeller}
                    </td>
                    <td class="space"></td>
                    <td class="monetary" style="vertical-align: bottom;">
                        $ ${value.valueShipping.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                    </td>
                    <td class="empty"></td>
                </tr>
            `);
        });
    }
    
}

// Function that list product vitrine in resume cart
   
function addProductVitrine(){
    fetch('/api/catalog_system/pub/products/search/?fq=productClusterIds:2554&O=OrderByTopSaleDESC&_from=0&_to=2')
  .then(
    function(response) {
      response.json().then(function(data) {   
        var cont = 0;
        var contentHtml = '';
        contentHtml +=  '<h3>COMPLETA TU PEDIDO CON</h3> <div class="d-flex container-checkoutResume">';
        $(".wrapperVitrineProduct").length == 0 ? $(".cart-more-options").append("<div class='wrapperVitrineProduct'></div>") : false;
        $.each(data,function(index,value){
           	var productSku = value.items[0].itemId.toString();
            var productName= value.productName;
            var productLink = value.link;
            var productPrice = toMoney(value.items[0].sellers[0].commertialOffer.Price).toString().replace(/.[^.]+$/, "");
            var productImage = value.items[0].images[0].imageUrl;
            contentHtml +=  '<div class="contentProductItem">'+
                                '<div class="itemProductBox">'+
                                    '<div class="imagePdtoItem"><img src="'+ replaceSize(productImage,150,150) +'"/></div>'+
                                    '<div class="namePdtoItem">'+ productName +'</div>'+
                                    '<div class="pricePdtoItem">'+ productPrice +'</div>'+
                                '</div>'+
                                '<div class="btnProduct">'+
                                    '<a style="cursor:pointer" class="addProduct" data-skuid="' + productSku + '">AGREGAR</a>'+
                                '</div>'+
                            '</div>';
        });
        contentHtml += '</div>';

        $(".wrapperVitrineProduct").html(contentHtml);

      });
    }
  )
  .catch(function(err) {
    console.error('Fetch Error :-S', err);
  });
}

function replaceSize(url, width, height) {
    const id = url.match(/\/\d{6}/)[0];
    const newURL = url.replace(id, `${id}-${width}-${height}`);
    return newURL;
}


function StepsState(){
    var curUri = window.location.href;
    console.log("aaaa111" + curUri);
    if (curUri.indexOf("cart") >= 0){
      $(".breadcrumCheckout a").removeClass("active");
      $("a#step-cart").addClass("active");
    }
    if (curUri.indexOf("email") >= 0){
      $(".breadcrumCheckout a").removeClass("active");
      $("a#step-profile").addClass("active");
    }
    if (curUri.indexOf("profile") >= 0){
      $(".breadcrumCheckout a").removeClass("active");
      $("a#step-shipping").addClass("active");
    }
    if (curUri.indexOf("shipping") >= 0){
      $(".breadcrumCheckout a").removeClass("active");
      $("a#step-shipping").addClass("active");
    }
    if (curUri.indexOf("payment") >= 0){
      $(".breadcrumCheckout a").removeClass("active");
      $("a#step-payment").addClass("active");
    }
  }
  
let contraAllowed = true
let paymentSelected = ""
function checkShippingMethod(){
  


//Fin funcion//  
    $('.pg-pago-contra-entrega').addClass('pago-hide');
    currentZipCode = $('.postal-code-value').html() || "";

    vtexjs.checkout.getOrderForm().done(function (e) {
        try {
            var methodShip = e.shippingData.logisticsInfo[0].selectedSla; 
            var paymentSystem = e.paymentData.payments[0].paymentSystem;
          	var sellerLenght = e.sellers.length;
            paymentSys = paymentSystem   
        } catch{
            var methodShip = "";
            paymentSelected = "";
        }
        try {
            var postalCode = e.shippingData.address.postalCode        
        } catch{
            var postalCode = currentZipCode
        }        
        console.log('*********************Method: '+ methodShip)
        console.log('*********************Postal Code: '+ postalCode)
        console.log('*********************Paymeny System: '+ paymentSystem)

        
        //Descomentar es para activar bloqueo de logysto contraentrega//
  /*   if (methodShip == "Rápido"){
            if (paymentSystem == "202") {
                $("#payment-group-debitPaymentGroup").click().click();
                console.log('combinación de pago y envio no permitida')
            }
            console.log('************pago contraentrega NO permitido')
            $('.pg-pago-contra-entrega').addClass('pago-hide');
            contraAllowed = false;
            if ($('.msgContra').length == 0){                
                $('.vtex-omnishipping-1-x-deliveryGroup').after('<p class="msgContra" style="font-size:0.8rem; color:#927d58;text-align: center;margin-top:1px; margin-bottom:4px; border:1px solid;">Pago contra entrega no está disponible con envío rápido') 
                $('.payment-body').after('<p class="msgContra" style="font-size:0.8rem; color:#927d58;text-align: center;margin:1px; border:1px solid;">Pago contra entrega no está disponible con envío rápido') 
            } else{
                $('.msgContra').each(function(){
                    $(this).show()
                })
            }            
        } else {
            console.log('************pago contraentrega permitido')
            $('.pg-pago-contra-entrega').removeClass('pago-hide');
            $("#payment-group-debitPaymentGroup").click().click();
            contraAllowed = true;
            $('.pg-pago-contra-entrega').show();
            if ($('.msgContra').length > 0){
                $('.msgContra').each(function(){
                    $(this).hide()
                })
            }
        }     */
        //if(zipcodesAvailables.indexOf(postalCode.toString()) > 0)   
      
      //Desactivar Contraentrega para Sellers.
      
      for (i=0; i < sellerLenght; i++){
			if (e.sellers[i].id != "1"){
				console.log('************pago contraentrega NO permitido para Seller');
				$('.pg-pago-contra-entrega').addClass('pago-hide');
				contraAllowed = false;
			}
		}   
      
      
      
    });
}
function changeCheckout(){

    console.log("Checkout is Updated");
     //Funcion para agregar al carrito//

            $(document).on("click",".addProduct", (e) =>{
              var idProductSku = $(e.currentTarget).attr("data-skuid");
        console.log(idProductSku)
        $.ajax({
            url :'/checkout/cart/add?sku=' + idProductSku + '&qty=1&seller=1&redirect=false&sc=1',
            method:'GET',
            success: function(){
                window.location.reload();
            },
            error: function(error){
                console.log(error);
            },
        });
      });     

      //Fin funcion//  


    
    $(".vtex-omnishipping-1-x-SummaryItemPrice,.price.pull-right").each(function(){
        var precio = $(this).text().replace(/,[^,]+$/, "");
        $(this).text(precio);
    });

    addProductVitrine();
    
    printSeparateShipping(); 
 /*   //insertar gift box
     $(".cart-select-gift-placeholder .text-center")[0] ||
    $(".cart-select-gift-placeholder").append(
        '<div class="text-center m-2"><h2 style="font-weight:800; color:#ff97a5; letter-spacing: 2px;">¡Hello Beauty!</h2><label><input type="checkbox" id="addBox" value="1">¿Deseas llevar tus productos favoritos <br>en nuestro <strong>empaque regalo</strong>?</label></div><div class="text-center m-2"><div style="display: inline-block;"><a href="/caja-navidad-producto/p"><img alt="Empaque regalo" src="/arquivos/caja-navidad-beautyholics.jpg" width="155"></a></div><div style="display: inline-block; color:#ff97a5; text-align: left; position: relative;"><h6 style="margin: 0; position: absolute; top: 50%;-ms-transform: translateY(-50%); transform: translateY(-50%);-webkit-transform: translateY(-50); padding: 5px;"><strong>PRECIO:</strong><br>$6.900<br><strong>MEDIDAS: </strong><br>22 x 22 x 11 CM</h6></div></div>'
    )  */

    if ( jQuery('#opt-in-newsletter')[0] ) {
        console.log("Estoy modificando el newsletter");
        if ( jQuery('#opt-in-newsletter').prop('checked') == false ) {
            jQuery('#opt-in-newsletter').prop('checked', true).trigger('change');
        }
    }


    if ( jQuery('.link.link-gift-card')[0] ) {
        if ( !jQuery('.checkedVale')[0] ) {
            jQuery('.box-step-content').prepend('<p class="checkedVale">Redimir bono</p>');
        }
    }
    
    
    if ( !$(".customAddresConstructor")[0] ) {
        $('.vtex-omnishipping-1-x-address').before( html_custom_address )
    }


    var valor_tipo_via = $('[name="tipo-via"]').val()
    var valor_calle = $('input#Calle').val()
    var valor_numero1 = $('input#numero1').val()
    var valor_numero2 = $('input#numero2').val()
    var Valor_direccion = valor_tipo_via + " " + valor_calle + " #" + valor_numero1 + " - " + valor_numero2;
    
    $("input#Calle").keyup(function () {
        //console.log("funcionaaaaaaa")
        valor_calle = $(this).val();
        Valor_direccion = valor_tipo_via + " " + valor_calle + " #"  + valor_numero1 + " - " + valor_numero2;
        //$("input#ship-street").val(Valor_direccion).trigger('change');
        simulateEvent('ship-street', Valor_direccion)
    })

    $("input#numero1").keyup(function () {
        //console.log("funcionaaaaaaa")
        valor_numero1 = $(this).val();
        Valor_direccion = valor_tipo_via + " " + valor_calle + " #"  + valor_numero1 + " - " + valor_numero2;
        // $("input#ship-street").val(Valor_direccion).trigger('change');
        simulateEvent('ship-street', Valor_direccion)
    })

    $("input#numero2").keyup(function () {
        //console.log("funcionaaaaaaa")
        valor_numero2 = $(this).val();
        Valor_direccion = valor_tipo_via + " " + valor_calle + " #"  + valor_numero1 + " - " + valor_numero2;
        // $("input#ship-street").val(Valor_direccion).trigger('change');
        simulateEvent('ship-street', Valor_direccion)
    })

    $('[name="tipo-via"]').change(function() {
        valor_tipo_via = $('[name="tipo-via"]').val()
        Valor_direccion = valor_tipo_via + " " + valor_calle + " #"  + valor_numero1 + " - " + valor_numero2;
        // $("input#ship-street").val(Valor_direccion).trigger('change');
        simulateEvent('ship-street', Valor_direccion)
    })

    if(!$('#ship-street').prop('disabled')){
        $("#ship-street").prop('disabled', true);
    }

    if( $('#ship-complement').attr('maxlength') != "40" ){
        $('#ship-complement').attr('maxlength','40')
    }
}

  $(document).ready(function(){
    
    console.log("11111")
    StepsState();
    checkShippingMethod();
    changeCheckout();
  })
  $(window).on('hashchange', function(){
    console.log("22222")
    StepsState();
    checkShippingMethod();
    changeCheckout();
  })
  $(window).load(function(){
    console.log("33333")
    StepsState();
    checkShippingMethod();
    changeCheckout();
    jQuery(".procesoCompra").css("opacity","1");
      })

$(document).ajaxStop(function(){
    console.log("444444")
    StepsState();
    changeCheckout();
    console.log("show contra:" + contraAllowed)
    if(contraAllowed){
        $('.pg-pago-contra-entrega').removeClass('pago-hide');    
        $('.pg-pago-contra-entrega').show();        
    } else {
        if ($('.pg-pago-contra-entrega').hasClass('active')){
            $("#payment-group-debitPaymentGroup").click().click()    
        }
        $('.pg-pago-contra-entrega').addClass('pago-hide');
        $('.pg-pago-contra-entrega').hide();        
    }
});

$(document).ready(function(){setTimeout(function(){   
   $("a#payment-group-debitPaymentGroup").click().click()
   }, 130);
})

$(window).load(function(){
  setTimeout(function(){ 
   $("a#payment-group-debitPaymentGroup").click().click()
   }, 150);

  $(".addCheckoutProduct").click(function () {
      $.ajax({
          url: "/checkout/cart/add?sku=1777&qty=1&seller=1&redirect=false&sc=1",
          method: "GET",
          success: function () {
              window.location.reload();
          },
          error: function (e) {
              console.log(e);
          },
      });
  }); 

 



                                                                          
})

$(document).on("click", "button#btn-go-to-payment", function(){
   setTimeout(function(){ 
   $("a#payment-group-debitPaymentGroup").click().click()
   }, 200);
})

$(document).on("click", "#payment-group-custom202PaymentGroupPaymentGroup", function(){
   alert('¿Has elegido como medio de pago contraentrega, estás seguro que deseas continuar con este medio de pago?');
})

$(document).on('click', 'input[value="Normal"]', function(){
  	contraAllowed = true;
  	$('.pg-pago-contra-entrega').show()
    if( $('.msgContra').length){
      $('.msgContra').each(function(){
        $(this).hide()
      })
    }  
}) 

//Descomentar para logysto con contraentrega "activar"

$(document).on('click', 'input[value="Rápido"]', function(){
  contraAllowed = true;
	$('.pg-pago-contra-entrega').show()
    if( $('.msgContra').length){
      $('.msgContra').each(function(){
        $(this).hide()
      })
    }  
})  


//Descomentar para bloquear logysto contraentrega
/*
$(document).on('click', 'input[value="Rápido"]', function(){
  contraAllowed = false;
  $('.pg-pago-contra-entrega').hide()
  if ($('.msgContra').length == 0){                
    $('.vtex-omnishipping-1-x-deliveryGroup').after('<p class="msgContra" style="font-size:0.8rem; color:#927d58;text-align: center;margin-top:1px; margin-bottom:4px; border:1px solid;">Pago contra entrega no está disponible con envío rápido') 
    $('.payment-body').after('<p class="msgContra" style="font-size:0.8rem; color:#927d58;text-align: center;margin:1px; border:1px solid;">Pago contra entrega no está disponible con envío rápido') 
  } else{
    $('.msgContra').each(function(){
      $(this).show()
    })
  }
})  */ 
addiAllySlug='beautyholicsprebel-ecommerce';
$.getScript('https://s3.amazonaws.com/statics.addi.com/vtex/js/vtex-co.bundle.min.js');