const router = require('koa-router')();
const nos = require('./nos');
const fileController = require('../backend/controllers/files');
const multer = require('koa-multer')({ dest: 'uploads/' });

router.post('/upload', multer.single('file'), async (ctx) => {    
    let result = await nos(ctx.request.body.files.file);
    ctx.body = {
        code: 200,
        message: 'success',
        name: result.name,
        url: result.url
    };
});

router.post('/getFileList', async (ctx) => {
    const { folderId } = ctx.request.body;
    try {
        // 查找某个文件夹下的文件
        const list = await fileController.getFileList(folderId);
        ctx.body = {
            code: 200,
            message: 'success',
            result: {
                list
            }
        };
    } catch (e) {
        ctx.body = {
            code: 500,
            message: e
        };
    }
});

router.post('/addFolder', async (ctx) => {
    try {
        let file = await fileController.addFile(ctx.request.body);
        ctx.body = {
            code: 200,
            message: 'success',
            result: {
                file
            }
        };
    } catch (e) {
        ctx.body = {
            code: 500,
            message: e
        };
    }
});

router.post('/addFile', async (ctx) => {

});

module.exports = router;
