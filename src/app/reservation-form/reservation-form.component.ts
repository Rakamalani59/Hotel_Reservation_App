import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})

export class ReservationFormComponent implements OnInit {

  roomtypes: string[] = ['Single Rooms', 'Double Rooms', 'Studio Rooms', 'Presidential Suites'];
  rooms: string[] = [];
  singleRooms: string[] = ['Room 1A','Room 2A','Room 3A','Room 4A','Room 5A'];
  doubleRooms: string[] = ['Room 100','Room 200','Room 300','Room 400','Room 500'];
  studioRooms: string[] = ['Room 305','Room 310','Room 315','Room 320','Room 325'];
  suitesRooms: string[] = ['Room 5050','Room 5060','Room 5070','Room 5080','Room 5090'];

  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute){

  }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomType: ['', Validators.required],
      roomNumber: ['', Validators.required]
     })

    let id = this.activatedRoute.snapshot.paramMap.get('id')

    if(id){
      let reservation = this.reservationService.getReservation(id)

      if(reservation)
        this.reservationForm.patchValue(reservation)
    }
  }

  onSubmit() {
    if(this.reservationForm.valid){

      let reservation: Reservation = this.reservationForm.value;

      let id = this.activatedRoute.snapshot.paramMap.get('id')

      if(id){
        // Update
        this.reservationService.updateReservation(id, reservation)
      } else {
        // New
        this.reservationService.addReservation(reservation)   
      }

      this.router.navigate(['/list'])
    }
  }

  updateRooms(checkType: any) {

    switch(checkType) {
      case 'Single Rooms' :
        this.rooms = this.singleRooms;
        break;
      case 'Double Rooms' :
         this.rooms = this.doubleRooms;
         break;
      case 'Studio Rooms' :
         this.rooms = this.studioRooms;
         break;
      case 'Presidential Suites' :
         this.rooms = this.suitesRooms;
         break;
      default:
         this.rooms = [];
         break;
    }
  }
}