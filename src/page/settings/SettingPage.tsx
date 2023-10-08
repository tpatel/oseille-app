import { Container } from '@chakra-ui/react';
import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useSnapshot } from 'valtio';
import { store } from '../../backend';
import { Tabs } from '../../component/Tabs';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyH1 } from '../../component/typography/MyFont';

const StyledSettingPages = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-top: 0px;
  gap: 20px;
`;

const ITEMS = [
  { to: 'farm', label: 'Ferme' },
  { to: 'invoices', label: 'Facturation' },
  { to: 'advanced', label: 'Avancé' },
];

export function SettingPage() {
  const posthog = usePostHog();
  useEffect(() => {
    posthog?.capture('setting_page_viewed');
  }, []);
  const snap = useSnapshot(store);

  return (
    <Container maxW="container.xl">
      <StyledSettingPages>
        <MyHeader>
          <MyH1>Réglages</MyH1>
        </MyHeader>
        <Tabs items={ITEMS} />
        <Outlet />
      </StyledSettingPages>
    </Container>
  );
}
