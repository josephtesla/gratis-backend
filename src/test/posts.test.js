import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import server from "../app";
import BlogPost from '../models/BlogPost';
import Comment from '../models/Comment';

chai.use(chaiHttp);

const mockPosts = [{
  authorName: "James Gosling",
  title: "How to create a Java App",
  body: "post body"
}, {
  authorName: "James Eric",
  title: "How to create a python App",
  body: "post body"
}];

describe("TESTS FOR POSTS ENDPOINTS", () => {
  beforeEach(async () => {
    await BlogPost.deleteMany();
    await Comment.deleteMany();
  });

  describe("CREATE BLOG POST", () => {
    it("should create a blog post document and return 200 response", (done) => {
      const dummyPost = mockPosts[0];
      chai.request(server)
        .post("/api/v1/posts")
        .send(dummyPost)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("status").equals("success");
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('authorName').equals(dummyPost.authorName);
          expect(res.body.data).to.have.property('body').equals(dummyPost.body);
          done();
        })
    })
  })

  describe("GET ALL BLOG POSTS", () => {
    it("should fetch all blog posts in an array and return 200 response", async () => {
      await BlogPost.insertMany(mockPosts);
      chai.request(server)
        .get("/api/v1/posts")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("status").equals("success");
          expect(res.body).to.have.property('data').to.be.an("array");
          expect(res.body.data.length).equals(2);
        })
    })
  })

  describe("GET SINGLE BLOG POST", () => {
    it("should fetch a single blog post and return 200 response", async () => {
      const dummyPost = mockPosts[0];
      const data = await BlogPost.create(dummyPost);
      chai.request(server)
        .get("/api/v1/posts/" + data._id)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("status").equals("success");
          expect(res.body).to.have.property('data').to.be.an("object");
          expect(res.body.data).to.have.property("_id").equals(data._id.toString());
          expect(res.body.data).to.have.property("title").equals(data.title);
        })
    })
  })


  describe("UPDATE A SINGLE BLOG POST", () => {
    it("should update a blog post and return 200 response", async () => {
      const dummyPost = mockPosts[0];
      const data = await BlogPost.create(dummyPost);
      chai.request(server)
        .put("/api/v1/posts/" + data._id)
        .send({ title: "This title is updated"})
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("status").equals("success");
          expect(res.body).to.have.property('data').to.be.an("object");
          expect(res.body.data).to.have.property("_id").equals(data._id.toString());
          expect(res.body.data).to.have.property("title").not.equals(data.title);
        })
    })
  })

  describe("DELETE A SINGLE BLOG POST", () => {
    it("should delete a blog post and return 200 response", async () => {
      const dummyPost = mockPosts[0];
      const data = await BlogPost.create(dummyPost);
      chai.request(server)
        .delete("/api/v1/posts/" + data._id)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("status").equals("success");
          expect(res.body).to.have.property('data').to.be.an("string");
          expect(res.body.data).to.equals(data._id.toString());
        })
    })
  })
})

