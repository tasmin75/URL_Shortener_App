import React, { useState, useEffect } from "react";
import style from "./LinkResult.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";

const LinkResult = ({ inputValue }) => {
  // console.log(inputValue);
  const [shortenLink, setShortenLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)


  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios(
        `https://api.shrtco.de/v2/shorten?url=${inputValue}`
      );
      setShortenLink(res.data.result.full_short_link);
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (inputValue.length) {
      fetchData();
    }
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [copied]);
  // console.log(shortenLink);

  if (loading) {
    return <p className={style.noData}>Loading...</p>
  }

  if (error) {
    return <p className={style.noData}>Something went wrong...</p>
  }

  return (
    <>
      {shortenLink && (
        <div className={style.result}>
          <p>{shortenLink}</p>

          <CopyToClipboard text={shortenLink} onCopy={() => setCopied(true)}>
            <button className={`${style.copied ? style.copied : ""}`}>
              Copy to clipboard
            </button>
          </CopyToClipboard>
        </div>
      )}
    </>
  );
};

export default LinkResult;
