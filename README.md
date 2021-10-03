# Fire alarm system web interface
This project was created with the goal of providing a remote monitoring solution for the "Simplex" fire alarm systems device models "4007ES", "4010ES" and "4100ES".
It was developed as a Single Page App using React.js, Redux and Firebase.

## How it works

An IoT device reads the data provided by the fire alarm device. This data is then uploaded to a firebase realtime database. Then the web page takes the data from firebase and displays the changes to the user.
After loggin in, the user can see the information provided by the fire alarm device and its changes in realtime.

**Note: this web interface tries by NO means to replace the actual fire alarm system device!**

## Screenshots
![Use screen](/src/readmeImages/Use_Animation.gif)

![Responsive screen](/src/readmeImages/Responsive_Animation.gif)