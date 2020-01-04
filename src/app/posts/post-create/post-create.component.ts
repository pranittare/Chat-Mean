import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  
  enteredContent = '';
  post: Post;
  isLoading = false;
  private mode = 'create';
  private postId: string;
  selectedFile = null
 
 
  constructor(public postsService: PostsService, public route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) =>{
      if (paramMap.has('postId')) {
        this.mode = 'edit'
        this.postId = paramMap.get('postId')
        //fetching
        this.isLoading = true;

        console.log('post create')

        this.postsService.getPost(this.postId).subscribe(postData =>{
          //result
          this.isLoading = false;

          this.post = {id: postData._id, content: postData.content}
        });
      } else {
        this.mode = 'create'
        this.postId = null;

      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return
    }
    this.isLoading = true;

    if (this.mode === 'create') { 
    this.postsService.addPost(form.value.content);
      
    } else {
      this.postsService.updatePost(this.postId, form.value.content )
    }
    this.isLoading = false;

    form.resetForm()
  }
  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(event.target.files)

    // this.http.post('http://localhost:3000/api/Images')
  }

}
