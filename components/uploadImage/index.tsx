import React, { Component } from "react";
import { storage } from "lib/firebase";
import Image from "next/image";
import styles from "./uploadImage.module.css";

export class UploadImage extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: null,
      progress: 0,
    };
  }
  render() {
    return (
      <div className={styles.main_container}>
        <progress
          className={styles.progress_bar}
          value={this.state.progress}
          max="100"
        />

        <input
          className={styles.input_file}
          type="file"
          onChange={this.handleChange}
          id="file"
        />
        <label className={styles.label} htmlFor="file">
          Choose a photo
        </label>
        <div className={styles.btn_container}>
          <button
            type="button"
            className={styles.btn}
            onClick={this.handleUpload}
          >
            Upload
          </button>
        </div>
        <div className={styles.img_container}>
          <Image
            layout="fill"
            src={
              this.state.url ||
              "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
            }
            alt="Shoppingify's product"
          />
        </div>
      </div>
    );
  }
  handleChange = (e) => {
    if (e.target.files[0]) {
      const newImage = e.target.files[0];
      this.setState({ image: newImage });
    }
  };
  handleUpload = (e) => {
    const { image } = this.state;
    const uploadImg = storage.ref(`images/${image.name}`).put(image);
    uploadImg.on(
      "state_changed",
      (snapshot) => {
        // progress function...
        const progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({ progress: progress });
      },
      (error) => {
        console.error(error);
      },
      () => {
        // completed function...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            this.setState({ url: url });
            this.props.imgURL(url);
          });
      }
    );
  };
}
