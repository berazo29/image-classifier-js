const imgLoad = document.getElementById('file-1')
const imgDisplay = document.querySelector('.previewImg')
let imgVerification = false

imgLoad.addEventListener('change', function () {
  const file = this.files[0]

  if (file) {
    const reader = new FileReader()

    reader.addEventListener('load', function () {
      console.log(this)
      imgDisplay.setAttribute('src', this.result)
    })
    reader.readAsDataURL(file)
    imgVerification = true
  }
  if (imgVerification === true) {
    console.log('Image Uploaded')
    console.log('Reading...')

    async function app () {
      console.log('Loading mobilenet..')

      // Load the model.
      net = await mobilenet.load()
      console.log('Sucessfully loaded model')

      // Make a prediction through the model on our image.
      const imgEl = document.querySelector('.previewImg')
      const result = await net.classify(imgEl)
      console.log('result:', result)
      const baseDiv = document.getElementById('base')
      baseDiv.lastElementChild.setAttribute('id', 'id-0')
      if (baseDiv.children.length <= 2) {
        for (let i = 1; i < result.length; i++) {
          const item = baseDiv.lastElementChild
          const clone = item.cloneNode(true)
          baseDiv.appendChild(clone)
          baseDiv.lastElementChild.setAttribute('id', 'id-' + i.toString())
        }
        for (let i = 0; i < result.length; i++) {
          const innerDiv = document.getElementById('id-' + i.toString())
          innerDiv.lastElementChild.firstElementChild.setAttribute('id', 'description-' + i.toString())
          innerDiv.lastElementChild.lastElementChild.setAttribute('id', 'percentage-' + i.toString())
        }
      }
      result.forEach((e, index) => {
        document.getElementById('description-' + index.toString()).innerHTML = e.className
        const prob = (e.probability * 100).toFixed(2)
        document.getElementById('percentage-' + index.toString()).innerHTML = prob.toString() + '%'
      })
    }
    app().then(r => {})
  } else {
    console.log('No Image Uploaded')
  }
})
