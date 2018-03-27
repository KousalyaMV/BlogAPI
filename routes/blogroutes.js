///////////////////////////////Start route//////////////////////////////////////////////////

module.exports = function(app) {
  var blogModule = require('../modules/blogmodule');

  // blogModule Routes
  app.route('/blogs/GetAllBlogs').get(blogModule.list_all_blogs);
  app.route('/blogs/CreateBlog').post(blogModule.create_a_blog);

  app.route('/blogs/:blogid/GetABlog').get(blogModule.read_a_blog);
  app.route('/blogs/:blogid/UpdateABlog').put(blogModule.update_a_blog);
  app.route('/blogs/:blogid/DeleteABlog').post(blogModule.delete_a_blog);
};

