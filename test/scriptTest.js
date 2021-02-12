function getMeta(metaName) {
    console.log('HUHU');
    const metas = document.getElementsByTagName('meta');
  
    for (let i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute('property') === metaName) {
          console.log( metas[i].getAttribute('content'));
          metas[i].setAttribute('content', "HELLO WORLD")
        return metas[i];
      }
    }
    return '';
  }

window.onload = function() {
    getMeta('og:title');
}