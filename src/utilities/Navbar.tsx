import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff; /* Customize background color */
  z-index: 1000; /* Ensure it's on top of other content */
  transition: top 0.3s ease-in-out; /* Smooth transition */
  ${(props: { isVisible: boolean }) =>
    !props.isVisible &&
    `
    top: -60px; /* Adjust the negative value to control how much it hides */
  `}
`;

export const NavbarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;