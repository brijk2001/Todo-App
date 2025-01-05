import "./styles/footer.css";
function Footer() {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} Brijesh Kandolkar. All rights
        reserved.
      </p>
    </footer>
  );
}

export default Footer;
