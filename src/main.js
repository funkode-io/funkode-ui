import './style.css'
import './components/hello-world.webc'

// Import the WebC component registration
import './webc-register.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <h1>Hello Vite with WebC!</h1>
    
    <!-- WebC component will be registered by the script in index.html -->
    <hello-world>
      <p>This content is passed via slot</p>
    </hello-world>
    
    <div class="card">
      <button id="counter" type="button">count is 0</button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))

function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}
