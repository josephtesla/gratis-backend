import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import server from "../app";
import BlogPost from '../models/BlogPost';
import Comment from '../models/Comment';
import comments from '../routes/comments';

chai.use(chaiHttp);

const mockPost = {
  authorName: "James Gosling",
  title: "How to create a Java App",
  body: "post body"
}

const mockComment = {
  authorName: "Travis",
  commentMessage: "Nice comment"
}

describe("TESTS FOR COMMENTS ENDPOINTS", () => {
  beforeEach(async () => {
    await BlogPost.deleteMany();
    await Comment.deleteMany();
  });

  describe("CREATE COMMENT ENDPOINT", () => {
    it("should create a comment on a post and return 200 response", async () => {
      const testPostId = (await BlogPost.create(mockPost))._id.toString();
      chai.request(server)
        .post("/api/v1/comments/post/" + testPostId)
        .send(mockComment)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("status").equals("success");
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('authorName').equals(mockComment.authorName);
          expect(res.body.data).to.have.property('postId').equals(testPostId);
        })
    })
  })

  describe("GET ALL COMMENTS ON A POST", () => {
    it("should fetch all comments on a posts in an array and return 200 response", async () => {
      const testPostId = (await BlogPost.create(mockPost))._id.toString();
      await Comment.create({...mockComment, postId: testPostId });
      chai.request(server)
        .get("/api/v1/comments/post/" + testPostId)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("status").equals("success");
          expect(res.body).to.have.property('data').to.be.an("array");
          expect(res.body.data.length).equals(1);
        })
    })
  })

  describe("GET SINGLE COMMENT", () => {
    it("should fetch a single comment and return 200 response", async () => {
      const testPostId = (await BlogPost.create(mockPost))._id.toString();
      const { _id } = await Comment.create({...mockComment, postId: testPostId });
      chai.request(server)
        .get("/api/v1/comments/" + _id)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("status").equals("success");
          expect(res.body).to.have.property('data').to.be.an("object");
          expect(res.body.data).to.have.property("_id").equals(_id.toString());
        })
    })
  })
})

