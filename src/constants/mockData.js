import { foodImg1, foodImg2, foodImg3, technologyImg1, technologyImg2 } from "../common/images"


export const MockUsers = {
  "johndoe@gmail.com" : {
    id: 1,
    name: "John Doe",
    email: "johndoe@gmail.com",
    password: "johndoe"
  }
}

export const MockBlogs = {
  "johndoe@gmail.com" : [{
      blogId: 1,
      title: "Blog 1",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl.",
      date: "2021-09-01",
      image: foodImg1,
      likes: 12,
      comments: []
    },
    {
      blogId: 2,
      title: "Blog 2",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl.",
      date: "2021-09-01",
      image: foodImg2,
      likes: 3,
      comments: []
    },
    {
      blogId: 3,
      title: "Blog 3",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl.",
      date: "2021-09-01",
      image: technologyImg1,
      likes: 2,
      comments: []
    },
    {
      blogId: 4,
      title: "Blog 4",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl.",
      date: "2021-09-01",
      image: foodImg3,
      likes: 8,
      comments: []
    },
    {
      blogId: 5,
      title: "Blog 5",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl.",
      date: "2021-09-01",
      image: technologyImg2,
      likes: 10,
      comments: [
        {
          email: "gourav@gmail.com",
          text: "OO bhai sab",
        }
      ]
    }
  ]
  
}