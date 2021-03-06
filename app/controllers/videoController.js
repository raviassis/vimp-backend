const { Video } = require('../models');
const { check, validationResult } = require('express-validator');
var fs = require('fs');
var path = require('path');

exports.validate = (method) => {
    switch (method) {
        case 'createVideo': {
            return [ 
                check('name', 'Name must be entered').exists(),
                check('nameUrl', 'NameUrl must be entered').exists(),
                check('nameUrl', 'Already exist a video with same nameUrl').custom((value) => {
                    return Video.findOne({
                        where: {
                            nameUrl: value,
                        },
                    }).then((video) => {
                        if (video) {
                            return Promise.reject();
                        }
                    });
                }),
                check('videoUrl', 'VideoUrl must be entered').exists(),
                check('duration', 'Duration must be entered').exists(),
                check('duration', 'Duration format not valid. Format valid hh:mm:ss').custom((value) => {
                    return typeof(value) === "string" &&
                            value.match(/\d\d:\d\d:\d\d/g); 
                }),
            ]
        }
    }
  }

getFileFormat = (name) => {
    return name.split('.').pop();
}

exports.post = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const validFormats = ['jpg', 'png'];
    const body = req.body;
    const file = req.files.file;
    const format = getFileFormat(file.name);

    if(!validFormats.includes(format)){
        return res.status(422)
                .json({
                    erros: [
                        `File format isn't valid. Format valids: 
                            ${validFormats.reduce((s1, s2) => { return s1 + ', ' + s2} )} '`
                    ]
                });
    }


    const nameFile = `poster_${Date.now()}.${format}`;
    const posterPath = path.join(process.cwd(),'datafile/video_poster');
    const dest = path.join(posterPath, nameFile);

    Video.create({
        name: body.name,
        nameUrl: body.nameUrl,
        posterPath: dest,
        videoUrl: body.videoUrl,
        description: body.description,
        duration: body.duration, 
    }).then((video) => {
        if ( !fs.existsSync(posterPath) ) {
            fs.mkdirSync(posterPath);
        }
        fs.renameSync(file.tempFilePath, dest, (err) => {
            if(err) throw err;
            else console.log("File Saved");
        });
        res.status(201).send(video);
    }).catch((err) => { next(err)});
};