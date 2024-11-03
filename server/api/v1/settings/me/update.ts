import { modifySetting } from "~/utils/database"
import { turnStringNice } from "~/utils/string"

export default eventHandler(async (event) => {
    const rawbody = await readBody(event)
    const body = JSON.parse(rawbody)

    const setting = body.setting 
    const value = body.value

    if (!setting || value == null) {
        throw createError({
            message: 'Setting and value are required',
            status: 400
        })
    }

    const userid = event.context.user.id

    await modifySetting(userid, setting, value).catch((err) => {
        throw createError({
            message: err,
            status: 400
        })
    })

    return {
        message: turnStringNice(setting) +' updated to ' + value
    }
})