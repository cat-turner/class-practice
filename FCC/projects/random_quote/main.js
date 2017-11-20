if (!('fetch' in window)) {
  console.log('Fetch API not found, try including the polyfill');

}else{
    console.log("hi");
}
// We can safely use fetch from now on