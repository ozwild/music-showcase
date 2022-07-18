<template>
  <div>
    <div id="background"></div>
    <h1>OzWorks</h1>
  </div>
</template>

<style lang="scss" scoped>
#background {
  position: absolute;
  height: 100vh;
  width: 100vw;
  margin: 0;
}

@import url('https://fonts.googleapis.com/css?family=Montserrat:900');

h1 {
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  text-align: justify;
  font-size: 11vmax;

  letter-spacing: 1vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  background-image: url('https://i.pinimg.com/originals/9f/9c/c5/9f9cc5217bb04790e5fb852b665ca2ff.jpg');
  background-size: auto 200%;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: backgrounds 650ms steps(6, start) infinite,
    shine 3s linear infinite, blur 7s forwards;

  @keyframes shine {
    from {
      background-position: center 0;
    }
    to {
      background-position: center 200%;
    }
  }

  @keyframes backgrounds {
    16.66% {
      background-image: url('https://cdn.pixabay.com/photo/2021/03/19/06/19/vector-pattern-6106662_1280.png');
    }

    33.33% {
      background-image: url('https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvcm0zMDQtcGF0dGVybi1ibHVlLWthdGllLTA1LnBuZw.png?s=kj9AQK61sXHJRuyDzRRYCMh0ZOU_voi8XX4XRVQfVys');
    }

    49.99% {
      background-image: url('https://images.assetsdelivery.com/compings_v2/adehoidar/adehoidar1802/adehoidar180200050.jpg');
    }
    66.66% {
      background-image: url('https://st.depositphotos.com/2885805/4187/v/600/depositphotos_41878165-stock-illustration-seamless-pattern-comic-speech-bubbles.jpg');
    }
    83.33% {
      background-image: url('https://media.istockphoto.com/vectors/seamless-pattern-with-wildflowers-old-fashioned-floral-pattern-with-vector-id1353736481?b=1&k=20&m=1353736481&s=612x612&w=0&h=io-8wNzpocuqnFkuW50v22IEdUt1qHatEj7sDG20uw8=');
    }
  }

  @keyframes blur {
    0% {
      filter: blur(150px);
      opacity: 1;
    }
    17% {
      filter: blur(2px);
      opacity: 1;
    }
    18% {
      filter: blur(1px);
      opacity: 1;
    }
    21% {
      filter: blur(2px);
      opacity: 1;
    }
    22% {
      filter: blur(2.5px);
      opacity: 1;
    }
    23% {
      filter: blur(2px);
      opacity: 1;
    }
    24% {
      filter: blur(1px);
      opacity: 1;
    }
    27% {
      filter: blur(0.5px);
      opacity: 1;
    }
    60% {
      filter: blur(0.5px);
      opacity: 1;
    }
    100% {
      filter: blur(150px);
      opacity: 0;
    }
  }
}
</style>

<script lang="ts" setup></script>
