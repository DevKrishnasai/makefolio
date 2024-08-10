import React from "react";

const NoPage = () => {
  return (
    <div id="oopss">
      <div id="error-text">
        <img
          src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg"
          alt="404"
        />
        <span>404 PAGE</span>
        <p class="p-a">
          Maybe the portfolio id you are looking for does not exist or the user
          has not created a portfolio yet
        </p>
        {/* <p class="p-b">... Back to previous page</p> */}
        {/* <a href="#" class="back">
          ... Back to previous page
        </a> */}
      </div>
    </div>
  );
};

export default NoPage;
