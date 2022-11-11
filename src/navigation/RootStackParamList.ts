import {MainBottomTabParamList} from './BottomTabs/MainBottomTabParams';
import {NoAuthStackParams} from './NoAuthStack/NoAuthStackParams';
import {TutorialStackParams} from './TutorialStack/TutorialStackParams';

type NestedNavigatorParams<ParamList> = {
  [K in keyof ParamList]: undefined extends ParamList[K]
    ? {screen: K; params?: ParamList[K]}
    : {screen: K; params: ParamList[K]};
}[keyof ParamList];

export type RootStackParamList = {
  BottomTabs: NestedNavigatorParams<MainBottomTabParamList>;
  NoAuthStack: NestedNavigatorParams<NoAuthStackParams>;
  TutorialStack: NestedNavigatorParams<TutorialStackParams>;
};
