import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { StudentDashModele } from './studentdash.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-studentdash',
  templateUrl: './studentdash.component.html',
  styleUrls: ['./studentdash.component.css']
})
export class StudentdashComponent implements OnInit {
  showAdd!:boolean;
  showUpdate!:boolean;
formValue !:FormGroup
studentModelOnj : StudentDashModele = new StudentDashModele();

studentAll:any;
  constructor(private formBuilder :FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      mobile:[''],
      fees:[''],
   })
   this.getAllStudents()
  }
  clickAddStudent(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate =false;

  }
  postStudentDetails(){
    this.studentModelOnj.firstName = this.formValue.value.firstName;
    this.studentModelOnj.lastName = this.formValue.value.lastName;
    this.studentModelOnj.email = this.formValue.value.email;
    this.studentModelOnj.mobile = this.formValue.value.mobile;
    this.studentModelOnj.fees = this.formValue.value.fees;

    this.api.postStudent(this.studentModelOnj).subscribe(res=>{
      console.log(res);
      alert("Student Record Added Successfully !");
      this.formValue.reset();
    },
    err=>{
      alert("something went wrong !!")
    }
    )
  }

  getAllStudents(){
    this.api.getStudent().subscribe(res=>{
      this.studentAll = res;
    })
  }
  deleteStudents(data:any){
    this.api.deleteStudent(data.id).subscribe(res=>{
      alert("Records Deleted Successfull !")
      this.getAllStudents();

    })

    }
    onEdit(data:any){
      this.showAdd = false;
      this.showUpdate =true;
      this.studentModelOnj.id= data.id;
      this.formValue.controls['firstName'].setValue(data.firstName);
      this.formValue.controls['lastName'].setValue(data.lastName);
      this.formValue.controls['email'].setValue(data.email);
      this.formValue.controls['mobile'].setValue(data.mobile);
      this.formValue.controls['fees'].setValue(data.fees)
    }
    updateStudentDetails(){
      this.studentModelOnj.firstName = this.formValue.value.firstName;
      this.studentModelOnj.lastName = this.formValue.value.lastName;
      this.studentModelOnj.email = this.formValue.value.email;
      this.studentModelOnj.mobile = this.formValue.value.mobile;
      this.studentModelOnj.fees = this.formValue.value.fees;
      this.api.updateStudent(this.studentModelOnj,this.studentModelOnj.id).subscribe(res=>{
        alert("Record updated successfull !!");
        this.formValue.reset();
        this.getAllStudents();
      })
    }
  

}
