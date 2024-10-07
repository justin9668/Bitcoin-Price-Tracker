import styled from "styled-components";
import { Github } from 'lucide-react'; // Icon from Lucide: https://lucide.dev/icons/github

const FooterContainer = styled.footer`
  text-align: center;
  padding: 10px;
  position: fixed;
  bottom: 0;
`;

const Button = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 50%;
  color: #09090b;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Button href="https://github.com/justin9668/mp-2" target="_blank">
        <Github />
      </Button>
    </FooterContainer>
  );
};

export default Footer;