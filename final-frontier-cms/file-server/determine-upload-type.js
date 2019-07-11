const fs = require('fs');
const url = require('url');
const path = require('path');
const parseBody = require('./parse-body');
const dataStore = require('./data-source');
const interpretServerPage = require('./interpret-server-page');
module.exports = function determineUploadType(req,res){

    parseBody(req,res, function(req,res){
        
        if(req.body.audioFile){
            fs.writeFile(`public/media/audio/${req.body.audioFile.filename}`, req.body.audioFile.data, function(err){
                dataStore.create('audio', {title: req.body.title, type:"audio", description: req.body.description, audioFile: "public/media/audio/"+req.body.audioFile.filename},function(err,id){
                    res.statusCode = 303;
                    res.statusMessage = "See Other";
                    res.setHeader("Location", "admin/audio.nsp");
                    res.end();  
                });
            });
        } else if(req.body.videoFile) {
            fs.writeFile(`public/media/video/${req.body.videoFile.filename}`, req.body.videoFile.data, function(err){

                dataStore.create('video', {title: req.body.title, type:"video", description: req.body.description, videoFile: "public/media/video/"+req.body.videoFile.filename},function(err,id){
                    res.statusCode = 303;
                    res.statusMessage = "See Other";
                    res.setHeader("Location", "admin/video.nsp");
                    res.end();  
                });
            });
        } else if(req.body.image){
            
            fs.writeFile(`public/media/images/${req.body.image.filename}`, req.body.image.data, function(err){
                dataStore.create('gallery', {title: req.body.title, type:"image", description: req.body.description, images: ["public/media/images/"+req.body.image.filename]},function(err,id){
                    res.statusCode = 303;
                    res.statusMessage = "See Other";
                    res.setHeader("Location", "admin/gallery.nsp");
                    res.end();  
                });
            });
        }

    }); 
}

