import { EmojiObjectsRounded } from "@mui/icons-material";
import React from "react";

const Hint = ({ hint }) => {
  return (
    <div class="item-hints">
      <div class="hint" data-position="">
        <span class="hint-radius"></span>
        <span class="hint-dot">
          <EmojiObjectsRounded />
        </span>
        <div class="hint-content do--split-children">
          <p>{hint}</p>
        </div>
      </div>
    </div>
  );
};

export default Hint;
