const Post = require('../model/Post');

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();

        res.status(200).json(posts)

    } catch (err) {
        res.status(500).json({ msg: "Something Went Wrong" })
    }
}
const getPostById = async (req, res) => {
    try {
        const id = req.params.id
        const post = await Post.findById(id);

        res.status(200).json(post)

    } catch (err) {
        res.status(500).json({ msg: "Something Went Wrong" })
    }
}

const addPost = async (req, res) => {
    try {

        const { title, desc } = req.body;

        if (!title || !desc) {
            return res.status(400).json({ msg: 'Pls add title or desc' })
        }

        const existingPost = await Post.findOne({ title });
        if (existingPost) {
            return res.status(409).json({ msg: 'Title already exists.' });
        }

        const post = new Post({
            title,
            desc
        });

        await post.save();
        res.status(201).json(post)

    } catch (err) {
        res.status(500).json({ msg: "Something Went Wrong" })
    }
}

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, desc } = req.body;

        if (!title || !desc) {
            return res.status(400).json({ msg: 'Title and description are required fields.' });
        }

        const existingPost = await Post.findOne({ title, _id: { $ne: id } });
        if (existingPost) {
            return res.status(409).json({ msg: 'A post with this title already exists' });
        }

        const post = await Post.findByIdAndUpdate(id, {
            title,
            desc
        }, { new: true })

        res.status(200).json(post)
    } catch (err) {
        res.status(500).json({ msg: "Something Went Wrong" })

    }
}

const deletePost = async (req, res) => {
    try {
        const id = req.params.id
        const post = await Post.findByIdAndDelete(id)
        res.status(200).json(`deleted Post id ${id}`)
    } catch (err) {
        res.status(500).json({ msg: "Something Went Wrong" })

    }
}

module.exports = {
    getPosts,
    getPostById,
    addPost,
    updatePost,
    deletePost,
}