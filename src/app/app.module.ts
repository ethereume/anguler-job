import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JsonplaceholderComponent } from './placeholder/jsonplaceholder/jsonplaceholder.component';
import { PlaceholderService } from './placeholder/placeholder.service';
import { JsonplaceholderPipe } from './placeholder/jsonplaceholder.pipe';
import { MatPaginatorIntl } from "@angular/material/paginator";
import  CustomPaginator  from './placeholder/paginator/PaginatorOverride';
import { UpdateComponent } from './placeholder/update/update.component';

@NgModule({
  declarations: [
    AppComponent,
    JsonplaceholderComponent,
    JsonplaceholderPipe,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [PlaceholderService,
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }],
  bootstrap: [AppComponent]
})
export class AppModule { }
