import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  form: NgForm;
  enteredContent = '';
  post: Post;
  isLoading = false;
  private mode = 'create';
  private postId: string;
  selectedFile = null
  subscription: Subscription
  editMode = false;
  editedItemIndex: number;
  editedItem: Post;
 
 
  constructor(public postsService: PostsService, public route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) =>{
      if (paramMap.has('postId')) {
     
        // console.log("true")
        // this.form.setValue({
            
        //   content: this.post.content
        // });
        console.log(this.form.value)
        this.editMode = true;
        this.mode = 'edit'

        this.postId = paramMap.get('postId')
        //fetching
        this.isLoading = true;

        console.log(this.mode)
        // this.post = this.postsService.getPost(this.postId)

        this.postsService.getPost(this.postId).subscribe(postData =>{
          this.isLoading = false;
          this.post = {
            id: postData._id, 
            
            content: postData.content, 
            
            
          }
        //   this.form.setValue({
            
        //   content: this.post.content
          
        // });
        });
      } 
       else {
        this.editMode = false;
        this.mode = 'create'
        this.postId = null;

      }
    });
  }
  
  onSavePost(postForm) {
    console.log(postForm)
    if (postForm.invalid) {
      return
    }
    this.isLoading = true;
    console.log(this.mode)


    if (this.mode === 'create') { 
      console.log(this.mode)

    this.postsService.addPost(postForm.value.content);
      
    } else  {
      this.mode === 'edit'
      console.log(this.mode)
  
      this.postsService.updatePost(this.postId, postForm.value.content )
      
    } 
    
    this.isLoading = false;

    postForm.resetForm()
  }
  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(event.target.files)

    // this.http.post('http://localhost:3000/api/Images')
  }

}
  
