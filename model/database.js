const mongoose = require("mongoose");
// const slugify = require("slugify");
// const validator = require("validators");


    const ProductSchema = new mongoose.Schema({
      category: {
        type: String,
        required: true,
      },
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        currency: {
          type: String,
          required: true,
        },
      
        created_at: {
          type: Date,
          default: Date.now,
        },
      });
      

// // DOCUMENT MIDDLEWARE: runs before .save() and .create()
// natoursSchema.pre("save", function (next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

// // natoursSchema.pre('save', function(next) {
// //   console.log('Will save document...');
// //   next();
// // });

// // natoursSchema.post('save', function(doc, next) {
// //   console.log(doc);
// //   next();
// // });

// // QUERY MIDDLEWARE
// // natoursSchema.pre('find', function(next) {
// natoursSchema.pre(/^find/, function (next) {
//   this.find({ secretTour: { $ne: true } });

//   this.start = Date.now();
//   next();
// });

// natoursSchema.post(/^find/, function (docs, next) {
//   console.log(`Query took ${Date.now() - this.start} milliseconds!`);
//   next();
// });

// // AGGREGATION MIDDLEWARE
// natoursSchema.pre("aggregate", function (next) {
//   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

//   console.log(this.pipeline());
//   next();
// });
module.exports = mongoose.model("Product", ProductSchema);