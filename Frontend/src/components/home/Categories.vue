<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="container px-6 pb-10 mx-auto mt-6">
      <div class="links">
        <div class="links__list py-2">
          <div class="links__item" style="height: 120px">

            <router-link 
            :to="{ path: '/books', query: { set_filter: 'ingles' } }" 
            class="links__item__inner">
              <svg
                width="102"
                height="102"
                reserveAspectRatio="xMidYMin"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 102.281 102.281"
                class="text-center items-center align-middle"
              >
                <g transform="translate(0 31.293) rotate(-20) scale(0.45)">
               
                  <path fill="#218ac2" xmlns="http://www.w3.org/2000/svg" d="M72.31,26.29C83.55,20.17,93.76,14.41,104.16,9c9-4.66,18.68-7.17,28.64-8.63A26.21,26.21,0,0,1,144.67,1c4.58,1.45,6.32,3.55,5.51,8.2-.72,4.14,0,7.9.92,11.83,1.52,6.39,2.75,12.84,4,19.29,2.22,11.49,4.25,23,6.58,34.5.68,3.34,2.14,6.51,3.19,9.78A68.67,68.67,0,0,1,167.08,92c1.17,5.65-1.78,10.23-7.42,11.54-5,1.16-10.1,2-15.1,3.19a74,74,0,0,0-38.93,23.64,15.52,15.52,0,0,1-9.52,5.12A10.56,10.56,0,0,1,88,133.7c-10.84-7.23-23.19-11.06-35.33-15.25-8.79-3-18-3-27.2-2.3a98.18,98.18,0,0,1-10.27.57c-4.73-.12-6.15-1.5-6.58-6.11q-1-11.1-1.76-22.24c-1.34-20-3-39.93-6.55-59.68-.78-4.36-.25-5.75,3.58-7.54A55.71,55.71,0,0,1,12.77,18c18.85-5.15,36.84-2,54.33,5.76C68.92,24.59,70.69,25.5,72.31,26.29Zm26.54,94.56c3.21-2.68,6-5.08,8.82-7.35a88.92,88.92,0,0,1,41.07-18.27c2.18-.36,4.58-.5,6-2.81-7.5-26.83-12.72-54.19-16.7-81.55C125.87,8,92,24.73,80.65,36c-.67,7.56,1.23,15.08,2.54,22.63,1.27,7.3,3.41,14.49,4.16,21.83.88,8.59,3.52,16.67,5.79,24.86C94.51,110.24,96.65,115,98.85,120.85ZM12.32,29.41c.12,2.09.08,3.52.29,4.92,3.09,21,5.95,41.94,6.16,63.18a16.85,16.85,0,0,0,2.17,8.25c2.16,0,4.13.13,6.08,0a88,88,0,0,1,39.63,5.63c4.53,1.78,9,3.66,13.55,5.41a42.14,42.14,0,0,0,4.67,1.14,46.6,46.6,0,0,0-1.05-4.82c-5.6-16-7.87-32.78-11.17-49.31-1.34-6.7-1.76-13.61-2.43-20.44-.36-3.74-2-6.12-5.38-8.05a76.81,76.81,0,0,0-30.95-9.55A42.45,42.45,0,0,0,12.32,29.41Z"/>
                </g>
              </svg>
              {{ $t("categories.category1") }}
            </router-link>
          </div>
          <div class="links__item" style="height: 120px">
            <router-link 
            :to="{ path: '/books', query: { set_filter: 'integrados' } }" 
            class="links__item__inner">
              <svg
                width="102"
                height="102"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 102.409 102.409"
              >
                <g transform="translate(-733.746 -567.746)">
                  <g transform="translate(733.746 592.073) rotate(-20) scale(0.14)">
                 
                    <path fill="#f863a3" d="M445.5,0H40.7C18.3,0,0,18.3,0,40.7v404.7c0,22.4,18.3,40.7,40.7,40.7h404.7c22.4,0,40.7-18.3,40.7-40.7V40.7
			C486.2,18.3,467.9,0,445.5,0z M462.2,445.5c0,9.2-7.5,16.7-16.7,16.7H40.7c-9.2,0-16.7-7.5-16.7-16.7V40.7
			C24,31.5,31.5,24,40.7,24h404.7c9.2,0,16.7,7.5,16.7,16.7v404.8H462.2z"/>
		<path fill="#f863a3" d="M193,300.6c-4.7-4.7-12.3-4.7-17,0l-36.1,36.1l-36.1-36.1c-4.7-4.7-12.3-4.7-17,0s-4.7,12.3,0,17l36.1,36.1l-36.1,36.1
			c-4.7,4.7-4.7,12.3,0,17c2.3,2.3,5.4,3.5,8.5,3.5c3.1,0,6.1-1.2,8.5-3.5l36.1-36.1l36.1,36.1c2.3,2.3,5.4,3.5,8.5,3.5
			s6.1-1.2,8.5-3.5c4.7-4.7,4.7-12.3,0-17l-36.1-36.1l36.1-36.1C197.7,312.9,197.7,305.3,193,300.6z"/>
		<path fill="#f863a3" d="M203,131.7h-51v-51c0-6.6-5.4-12-12-12s-12,5.4-12,12v51H77c-6.6,0-12,5.4-12,12s5.4,12,12,12h51v51c0,6.6,5.4,12,12,12
			s12-5.4,12-12v-51h51c6.6,0,12-5.4,12-12S209.6,131.7,203,131.7z"/>
		<path fill="#f863a3" d="M403.9,371.1H296.4c-6.6,0-12,5.4-12,12s5.4,12,12,12h107.4c6.6,0,12-5.4,12-12S410.5,371.1,403.9,371.1z"/>
		<path fill="#f863a3" d="M403.9,312.2H296.4c-6.6,0-12,5.4-12,12s5.4,12,12,12h107.4c6.6,0,12-5.4,12-12S410.5,312.2,403.9,312.2z"/>
		<path fill="#f863a3" d="M394.6,155.7c6.6,0,12-5.4,12-12s-5.4-12-12-12H287.1c-6.6,0-12,5.4-12,12s5.4,12,12,12H394.6z"/>
                  </g>
                </g>
              </svg>
              {{ $t("categories.category2") }}
            </router-link>
          </div>
          <div class="links__item" style="height: 120px">
            <router-link 
            :to="{ path: '/books', query: { set_filter: 'lectoescritura' } }" 
            class="links__item__inner">
              <svg
                width="102"
                height="102"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 102.938 102.537"
              >
                <g transform="translate(-1145.331 -567.731)  ">
                  <g
                    transform="matrix(0.94, -0.342, 0.342, 0.94, 1145.731, 595.093) "
                  >
                    <path transform="translate(-0.425 -2.604) scale(2.1)" fill="#9c55ba" xmlns="http://www.w3.org/2000/svg" d="M24.98 30.009h-23v-25h14.050l2.022-1.948-0.052-0.052h-16.020c-1.105 0-2 0.896-2 2v25c0 1.105 0.895 2 2 2h23c1.105 0 2-0.895 2-2v-14.646l-2 1.909v12.736zM30.445 1.295c-0.902-0.865-1.898-1.304-2.961-1.304-1.663 0-2.876 1.074-3.206 1.403-0.468 0.462-13.724 13.699-13.724 13.699-0.104 0.106-0.18 0.235-0.219 0.38-0.359 1.326-2.159 7.218-2.176 7.277-0.093 0.302-0.010 0.631 0.213 0.851 0.159 0.16 0.373 0.245 0.591 0.245 0.086 0 0.172-0.012 0.257-0.039 0.061-0.020 6.141-1.986 7.141-2.285 0.132-0.039 0.252-0.11 0.351-0.207 0.631-0.623 12.816-12.618 13.802-13.637 1.020-1.052 1.526-2.146 1.507-3.253-0.019-1.094-0.55-2.147-1.575-3.129zM29.076 6.285c-0.556 0.574-4.914 4.88-12.952 12.798l-0.615 0.607c-0.921 0.285-3.128 0.994-4.796 1.532 0.537-1.773 1.181-3.916 1.469-4.929 1.717-1.715 13.075-13.055 13.506-13.48 0.084-0.084 0.851-0.821 1.795-0.821 0.536 0 1.053 0.244 1.577 0.748 0.627 0.602 0.95 1.179 0.959 1.72 0.010 0.556-0.308 1.171-0.943 1.827z"/>
                  </g>
                </g>
              </svg>
              {{ $t("categories.category3") }}
            </router-link>
          </div>
        </div>
        
      </div>
    </div>
  </section>
</template>

<style>
.main-section--links {
  padding-top: 35px;
  padding-bottom: 40px;
}
.links {
  overflow: hidden;
  padding-bottom: 4rem;
}
.links:last-child {
  padding-bottom: 0;
}
.links__list {
  margin: -20px -10px 0;
  font-size: 0;
  letter-spacing: -4px;
}
@media (max-width: 639px) {
  .links__list {
    margin: -10px -5px 0;
  }
}
.links__item {
  display: inline-block;
  vertical-align: top;
  width: calc(100% / 3);
  padding: 20px 10px 0;
  font-weight: normal;
  font-style: normal;
  font-size: 2.4rem;
  line-height: 1.25;
  letter-spacing: normal;
}
@media (max-width: 991px) {
  .links__item {
    font-size: 2rem;
  }
}
@media (max-width: 767px) {
  .links__item {
    width: calc(100% / 2);
  }
}
@media (max-width: 639px) {
  .links__item {
    padding: 10px 5px 0;
  }
}
@media (max-width: 479px) {
  .links__item {
    width: 100%;
  }
}
.links__item__inner {
  text-decoration: none;
  position: relative;
  overflow: hidden;
  color: inherit;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding: 20px 100px 20px 20px;
  min-height: 105px;
  height: 100%;
  z-index: 1;
  border-radius: 10px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
  transition-property: color;
  transition-duration: 0.2s;
}
@media (max-width: 1199px) {
  .links__item__inner {
    min-height: 90px;
    padding-right: 80px;
  }
}
.links__item__inner::before {
  content: "";
  display: block;
  position: absolute;
  right: 50px;
  bottom: 50px;
  width: 850px;
  height: 800px;
  margin: 0 -400px -400px 0;
  border-radius: 800px;
  background-color: #f6493c;
  z-index: -1;
  opacity: 0;
  will-change: opacity, transform;
  transition-property: opacity, transform;
  transition-duration: 0.6s;
  -ms-transform: scale(0);
  transform: scale(0);
  transform: scale3d(0, 0, 1);
}
.links__item:nth-child(1) .links__item__inner::before {
  background-color: #218ac2;
}
.links__item:nth-child(2) .links__item__inner::before {
  background-color: #f863a3;
}
.links__item:nth-child(3) .links__item__inner::before {
  background-color: #9c55ba;
}
.links__item:nth-child(4) .links__item__inner::before {
  background-color: #95ce31;
}
.links__item:nth-child(5) .links__item__inner::before {
  background-color: #ffc000;
}
.links__item:nth-child(6) .links__item__inner::before {
  background-color: #fc9720;
}
.links__item:nth-child(7) .links__item__inner::before {
  background-color: #ff3900;
}
.links__item:nth-child(8) .links__item__inner::before {
  background-color: #61b9f8;
}
.links__item:nth-child(9) .links__item__inner::before {
  background-color: #2abb4b;
}
.links__item__inner svg {
  display: block;
  position: absolute;
  right: -10px;
  bottom: -10px;
  width: 102px;
  height: 102px;
  will-change: opacity, transform;
  transition-property: opacity, transform;
  transition-duration: 0.4s;
}
@media (max-width: 1199px) {
  .links__item__inner svg {
    width: 86px;
    height: 86px;
  }
}
.links__item__inner path {
  transition-property: fill;
  transition-duration: 0.4s;
}
.links__item__inner:hover {
  color: white;
  transition-duration: 0.4s;
}
.links__item__inner:hover::before {
  opacity: 1;
  -ms-transform: scale(1);
  transform: scale(1);
  transform: scale3d(1, 1, 1);
}
.links__item__inner:hover svg {
  opacity: 0.3;
  -ms-transform: rotate(-15deg) scale(1.3) translate(-5px, -5px);
  transform: rotate(-15deg) scale(1.3) translate(-5px, -5px);
  transform: rotate3d(0, 0, 1, -15deg) scale3d(1.3, 1.3, 1)
    translate3d(-5px, -5px, 0);
}
.links__item__inner:hover path {
  fill: white;
}
</style>
