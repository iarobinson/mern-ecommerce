import express from 'express';
const router = express.Router();

// Bring in Models & Helpers
const Wishlist = require('../../models/wishlist');
const auth = require('../../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const { product, isLiked } = req.body;
    const user = req.user;
    const update = {
      product,
      isLiked,
      updated: Date.now()
    };
    // @ts-ignore
    const query = { product: update.product, user: user._id };

    const updatedWishlist = await Wishlist.findOneAndUpdate(query, update, {
      new: true
    });

    if (updatedWishlist !== null) {
      res.status(200).json({
        success: true,
        message: 'Your Wishlist has been updated successfully!',
        wishlist: updatedWishlist
      });
    } else {
      const wishlist = new Wishlist({
        product,
        isLiked,
        // user: user._id
      });

      const wishlistDoc = await wishlist.save();

      res.status(200).json({
        success: true,
        message: `Added to your Wishlist successfully!`,
        wishlist: wishlistDoc
      });
    }
  } catch (e) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch wishlist api
router.get('/', auth, async (req, res) => {
  try {
    // @ts-ignore
    const user = req.user._id;

    const wishlist = await Wishlist.find({ user, isLiked: true })
      .populate({
        path: 'product',
        select: 'name slug price imageUrl'
      })
      .sort('-updated');

    res.status(200).json({
      wishlist
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

module.exports = router;
