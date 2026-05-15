import "./Footer.css"
import heartIcon from "../../assets/heart-footer.svg"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© Processo de Trainee <strong>Unect Jr.</strong></p>
        <p className="footer-credit">
          Feito com <img src={heartIcon} alt="" /> por <strong>Felipe Dobravoski</strong>
        </p>
      </div>
    </footer>
  )
}

export default Footer
