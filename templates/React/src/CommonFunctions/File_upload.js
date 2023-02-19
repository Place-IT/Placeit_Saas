import {logdata} from "./Logger/Logevents";

export default function onSelectFile  (e,update_file,) {
    if (!e.target.files || e.target.files.length === 0) {
        update_file(undefined,undefined)
        return
    }
    update_file(e.target.files[0],e.target.files[0].name)
    logdata("onSelectFile","info"," image_selected")
}