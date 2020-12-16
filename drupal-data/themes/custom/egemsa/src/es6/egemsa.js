AOS.init({
  duration: 800,
});

(($, Drupal) => {
  Drupal.behaviors.egemsa = {
    attach: (context, settings)  => {

      // ***********
      // Utils.
      // ***********
      const egemsaWrap = (sel, wrapper) => {
        $(`:not(${sel}) + ${sel}, * > ${sel}:first-of-type`)
          .each(function() {
            $(this)
              .nextUntil(`:not(${sel})`)
              .addBack()
              .wrapAll(wrapper);
          }
        );
      };

      const removeAttrs = (sel) => {
        $(sel)
        .removeAttr('width')
        .removeAttr('height')
      }

      const iconForm = (form, icon) => {
        if($(form).length) {
          $('.title-container')
            .css(
              'background-image',
              `url("/themes/custom/egemsa/assets/iconos/enlace-${icon}.svg")`
            );
        }
      }

      // ******
      // Remove attrs.
      // ******
      removeAttrs('.cliente-item figure img');
      removeAttrs('.ambiente-img img');
      removeAttrs('.slider-publicaciones .slider-item img');
      removeAttrs('.main-figure img');
      removeAttrs('.paragraph-slider-container img');

      if (window.matchMedia("(max-width: 576px)").matches) {
        removeAttrs('#home-nosotros img');
        removeAttrs('#home-instalaciones img');
      }


      // ***********
      // DOM.
      // ***********

      // Slider Item Page.
      const $el = $('<div class="text-container"></div>');
      const $psi = $('.paragraph-slider-container');
      $psi.each((k, item) => {
        const $newEl = $el.clone();
        $newEl.append($(item).find('h5,p'));
        $(item).append($newEl);
      });

      if($psi.parent().attr('class') !== 'slider-paragraph') {
        egemsaWrap(
          '.paragraph-slider-item',
          '<div class="slider-paragraph green-dots" />'
        );
      }

      $('.slider-paragraph').slick({
        dots: true,
        arrows: false,
      })

      // Galeria Item page.
      const $gi = $('.galeria-slider-item');

      $gi.find('img').each(function() {
        const src = $(this).attr('src').replace('styles/galeria_item/public/', '')
        $(this).wrap(`<a href="${src}"></a>`);
      });

      if($gi.parent().attr('class') !== 'slider-galeria') {
        egemsaWrap(
          '.galeria-slider-item',
          '<div class="slider-galeria blue-arrows" />'
        );
      }

      // Forms.
      $('.js-form-item').addClass('form-group');

      iconForm('.webform-submission-buzon-de-sugerencias-form', 'buzon1');
      iconForm('.webform-submission-buzon-de-denuncias-form', 'buzon2');
      iconForm('.webform-submission-contact-form', 'contactenos');
      iconForm('.webform-submission-reclamaciones-form', 'libro');
      iconForm('.webform-submission-mesa-form', 'mesa');

      $('#main-nav li a:contains("Inicio")').html('<i class="fas fa-home"></a>');
      $('#main-nav li a:contains("Búsqueda")').html('<i class="fas fa-search"></a>');

      // Galería

      // ***********
      // Sliders.
      // ***********
      $('.slider-clientes').slick({
        autoplay: true,
        arrows: false,
        dots: true
      });

      if (window.matchMedia("(max-width: 576px)").matches) {}

      $('.home-places-container').slick({
        dots: false,
        arrows: true,
        mobileFirst: true,
        responsive: [{
          breakpoint: 576,
          settings: 'unslick'
        }]
      });

      $('.slider-responsabilidad').slick({
        autoplay: true,
        arrows: false,
        dots: true,
        slidesToShow: 1,
        variableWidth: true
      });

      $('.slider-responsabilidad-text').slick({
        autoplay: false,
        arrows: false,
        dots: false,
      });

      $('.slider-responsabilidad').on('beforeChange', (e, s, c) => {
        $('.slider-responsabilidad-text').slick('slickGoTo', c+1);
      });

      // Galeria Lightbox.
      new SimpleLightbox('.slider-galeria a', {});

      $('.slider-galeria').slick({
        dots: false,
        arrows: true,
        slidesToShow: 1,
        variableWidth: true,
        autoplay: true,
        infinite: false,
        responsive: [
          {
            breakpoint: 576,
            settings: {
              variableWidth: false,
              autoplay: false
            }
          }
        ]
      })

      $('.slider-publicaciones').slick({
        dots: false,
        arrow: false,
        slidesToShow: 4,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 1,
              arrows: true
            }
          }
        ]
      })

      // ***********
      // Effects.
      // ***********
      $(window).scroll(() => {
        if($(window).scrollTop() > 90) {
          $('#header').addClass('tiny')
        } else {
          $('#header').removeClass('tiny')
        }
      });


      var image = document.getElementsByClassName('parallay');
      new simpleParallax(image, {
        scale: 1.4,
        overflow: false
      });

      // Toggle.
      $('.zero').click(() => {
        $('#secondary-nav').addClass('visible')
      });

      $('.close-nav').click(() => {
        $('#secondary-nav').removeClass('visible')
      });




    }
  }
})(jQuery, Drupal);