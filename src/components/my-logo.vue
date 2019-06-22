<template>
  <div class="logo-wrap">
    <svg
      version="1.1"
      id="svg-draw"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="100px"
      y="0px"
      width="100%"
      height="100%"
      xml:space="preserve"
      xmlns:svgjs="http://svgjs.com/svgjs"
      viewBox="0 0 675 500">
      <g>
          <linearGradient
            id="SVGID_1_"
            gradientUnits="userSpaceOnUse"
            x1="45.272"
            y1="86.8503"
            x2="155.1152"
            y2="86.8503"
          >
            <stop offset="0.1933" style="stop-color:#C79F62"></stop>
            <stop offset="1" style="stop-color:#6A3906"></stop>
          </linearGradient>
          <path
            class="yy"
            fill="url(#SVGID_1_)"
            d="M90.5,173.1c-20.7-5-34.6-26.4-31.7-48.5c1.5,1.4,4.1,3.9,4.7,4.4c2.7,2.5,2.7,2.5,2.8,5.9l0.1,1.7
  c0.4,9.4,5.5,17.2,15.6,23.8l2.1,1.3l0.3-2.4c1.4-13.1-2.8-24.2-13.1-34.9c-2.8-2.9-5.6-5.6-8.5-8.4c-2.3-2.3-4.7-4.5-6.9-6.8
  c-11.1-11.2-13.4-25-6.9-41c7-17.4,34.4-53.2,51.8-67.7c2.1,2.3,4.2,4.5,6.3,6.8c5.4,5.7,10.9,11.6,15.6,17.8
  c8.9,12,19.2,26.2,27.6,41.3c7.3,12.9,6.6,26.2-2,38.4c-0.6,0.9-1.3,1.7-2.1,2.7l-1.8-3.4c-0.4-0.9-0.8-1.7-1.1-2.3
  c-1.1-2.1-1.1-2.1,2.1-7.7c4.5-8.1,2-16.7-0.8-22.6c-9.7-19.9-23.4-38.7-43.3-59.2l-1.1-1.1l-1.1,1.2
  C83.5,28.6,66.3,48.5,55.4,72.5c-5.7,12.6-2.4,25,9.6,35.7c7.5,6.7,13.6,13.2,18.5,19.9C92.3,139.9,94.5,153.9,90.5,173.1z"
          >
            <animate attributeType="XML" attributeName="stroke-dasharray" from="0, 0" to="1, 0" begin="0s" dur="3s" repeatCount="indefinite"></animate>
          </path>
          <linearGradient
            id="SVGID_2_"
            gradientUnits="userSpaceOnUse"
            x1="33.7037"
            y1="147.5053"
            x2="166.2963"
            y2="147.5053"
          >
            <stop offset="0.1933" style="stop-color:#C79F62"></stop>
            <stop offset="1" style="stop-color:#6A3906"></stop>
          </linearGradient>
          <path
            fill="url(#SVGID_2_)"
            d="M103.8,199.4c-5.4,0-13.9-0.9-19.9-3.4c-27.6-11.5-44-31-48.9-58c-2.4-13.2-1.5-26.7,3-42.4
  c0,0,2.9,9,3.1,9.7l0.4,1.3c1.4,4.1,1.4,4.1,0.9,7.7l-0.4,3.3c-3.6,29.9,10.7,54.8,40.3,70c6.1,3.2,11.9,4.7,17.6,4.7
  c6.1,0,12.3-1.7,19-5.3c30.5-16.2,43.9-42.6,38.8-76.2c-0.3-2.1,0.5-4.7,1.2-7c0.9-2.8,1.9-5.6,3-8.3c10.3,31.9,3.7,73.1-34.4,95.1
  c-5,2.9-10.7,5.5-18,8.2C108.8,199.2,106.9,199.4,103.8,199.4z"
          ></path>
          <linearGradient
            id="SVGID_3_"
            gradientUnits="userSpaceOnUse"
            x1="67.6994"
            y1="114.448"
            x2="142.0066"
            y2="114.448"
          >
            <stop offset="0.1933" style="stop-color:#C79F62"></stop>
            <stop offset="1" style="stop-color:#6A3906"></stop>
          </linearGradient>
          <path
            fill="url(#SVGID_3_)"
            d="M110,173.5c-5.8-21.3,0-43.2,14.1-53.7c0.8,1.6,1.1,2.9,1.2,4.5c0.2,3.2-1,6.5-3.6,9.7
  c-5.9,7.3-6.6,16.6-6.5,24.7l0,2.2l2.1-0.9c11.8-4.8,19.1-20,16.8-34.5c-3.3-20.5-14.5-36.5-26.1-50.7c-1.3-1.6-2.7-3.1-4.4-4.9
  L99.1,65l-27.3,38.5L67.7,98c6-13,20.1-31.5,32.6-42.6l2.9,3c2.9,3,5.8,6,8.5,9.2c14.8,17.1,23.4,31.9,27.9,47.8
  c7.1,24.8-1.4,44-24.4,55.5c-1.3,0.7-2.6,1.3-3.9,1.9L110,173.5z"
          ></path>
        </g>
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'my_logo',
    data () {
      return {
      }
    }
  }
</script>

<style scoped lang="scss">
  .logo-wrap {
    display: inline-block;
    svg {
      width: 100%;
      height: auto;
    }
  }
</style>
