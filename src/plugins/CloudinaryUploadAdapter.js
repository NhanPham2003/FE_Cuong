import Plugin from "@ckeditor/ckeditor5-core/src/plugin"
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview"
import * as mediaFileAPI from "@/api/mediaFileAPI"
import folderName from "@/enum/folderName"
import getUrlImage from "@/utils/getUrlImage"

export default class CloudinaryUploadPlugin extends Plugin {
  static get pluginName() {
    return "CloudinaryUpload"
  }

  init() {
    const editor = this.editor

    editor.ui.componentFactory.add("cloudinaryUploadButton", locale => {
      const view = new ButtonView(locale)

      view.set({
        label: "Upload image",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-photo-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.813 11.612c.457 -.38 .918 -.38 1.386 .011l.108 .098l4.986 4.986l.094 .083a1 1 0 0 0 1.403 -1.403l-.083 -.094l-1.292 -1.293l.292 -.293l.106 -.095c.457 -.38 .918 -.38 1.386 .011l.108 .098l4.674 4.675a4 4 0 0 1 -3.775 3.599l-.206 .005h-12a4 4 0 0 1 -3.98 -3.603l6.687 -6.69l.106 -.095zm9.187 -9.612a4 4 0 0 1 3.995 3.8l.005 .2v9.585l-3.293 -3.292l-.15 -.137c-1.256 -1.095 -2.85 -1.097 -4.096 -.017l-.154 .14l-.307 .306l-2.293 -2.292l-.15 -.137c-1.256 -1.095 -2.85 -1.097 -4.096 -.017l-.154 .14l-5.307 5.306v-9.585a4 4 0 0 1 3.8 -3.995l.2 -.005h12zm-2.99 5l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z" stroke-width="0" fill="currentColor" /></svg>',
        tooltip: true,
      })

      view.on("execute", () => {
        const input = document.createElement("input")

        input.type = "file"
        input.accept = "image/*"
        input.onchange = async event => {
          const file = event.target.files[0]

          if (file && file.size < (1024 * 1024 * 10)) {
            const response = await mediaFileAPI.addMediaFile(file, folderName.draft)
            
            const imageHtml = `<figure class='image'><img src='${getUrlImage(response.data.id)}'></figure>`

            editor.setData(editor.getData() + imageHtml)
          } else {
            const imageHtml = `<p>File is too large</p>`

            editor.setData(editor.getData() + imageHtml)
          }
        }
        input.click()
      })

      return view
    })
  }
}
