const express = require('express');
const router = express.Router();
const Post = require('../models/post')


router.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept'
        );
    res.setHeader(
        'Access-Control-Allow-Methods', 
        'GET, POST, PATCH, DELETE, OPTIONS, PUT'
        )
    next();
});

router.post('',(req, res, next) =>{
    const post = new Post({
        content: req.body.content
    });
    console.log(post);
    post.save().then(createdPost =>{
        res.status(201).json({
            message: 'Post added sucessfully',
            postId: createdPost._id        
        });
    })


});
//LlTcXcGYGBl37iDQ 

router.put('/:id',(req,res, next) =>{
    const post = new Post({
        _id: req.body.id,
        content: req.body.content
    })
    Post.updateOne({_id: req.params.id}, post)
    .then(result =>{
        console.warn(result);
        res.status(200).json({message: "update Successful!"})
    })
} )

router.get('' ,(req, res, next) =>{
    Post.find()
        .then(documents =>{
            // console.log(documents)
            res.status(200).json({
                message: 'Posts fetech successfully!!!',
                posts: documents
            });
        });

});
router.get('/:id', (req,res, next) =>{
    Post.findById(req.param.id).then(post =>{
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not Found'})
        }
    })
})

router.delete('/:id',(req, res, next) =>{
    Post.deleteOne({_id: req.params.id}).then(result =>{
        console.log(result);
        res.status(200).json({
            message: 'post Deleted'
        })
    })

})

module.exports = router;