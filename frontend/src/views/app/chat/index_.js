// import { useRef, useState, useEffect } from 'react';
// import {
//   Checkbox,
//   Panel,
//   DefaultButton,
//   TextField,
//   SpinButton,
//   Dropdown,
//   IDropdownOption,
// } from '@fluentui/react';
// // import { SparkleFilled } from "@fluentui/react-icons";

// // import styles from "./Chat.module.css";

// import {
//   chatApi,
//   RetrievalMode,
//   Approaches,
//   AskResponse,
//   ChatRequest,
//   ChatTurn,
//   updateApi,
//   UpdateRequest,
//   EmployeeResponse,
// } from '../../api';
// import { Answer, AnswerError, AnswerLoading } from '../../components/Answer';
// import { QuestionInput } from '../../components/QuestionInput';
// import { ExampleList } from '../../components/Example';
// import { UserChatMessage } from '../../components/UserChatMessage';
// import {
//   AnalysisPanel,
//   AnalysisPanelTabs,
// } from '../../components/AnalysisPanel';
// import { SettingsButton } from '../../components/SettingsButton';
// import { ClearChatButton } from '../../components/ClearChatButton';

// const Chat = () => {
//   const [user, setUser] = useState();
//   useEffect(() => {
//     if (!user) {
//       const user_ = localStorage.getItem('user_employee');
//       let user;
//       user = JSON.parse(user_);
//       console.log('user', user);
//       setUser(user);
//     }
//   }, [user]);

//   const [isConfigPanelOpen, setIsConfigPanelOpen] = useState(false);
//   const [isIframe, setIsIframe] = useState(false);
//   const [promptTemplate, setPromptTemplate] = useState('');
//   const [retrieveCount, setRetrieveCount] = useState(3);
//   const [retrievalMode, setRetrievalMode] = useState(RetrievalMode.Hybrid);
//   const [useSemanticRanker, setUseSemanticRanker] = useState(true);
//   const [useSemanticCaptions, setUseSemanticCaptions] = useState(false);
//   const [excludeCategory, setExcludeCategory] = useState('');
//   const [useSuggestFollowupQuestions, setUseSuggestFollowupQuestions] =
//     useState(false);

//   const lastQuestionRef = useRef('');
//   const chatMessageStreamEnd = useRef(null);

//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState();

//   const [activeCitation, setActiveCitation] = useState();
//   const [activeAnalysisPanelTab, setActiveAnalysisPanelTab] =
//     useState(undefined);

//   const [selectedAnswer, setSelectedAnswer] = useState(0);
//   const [thread_id, setThread_id] = useState(null);
//   const [answers, setAnswers] = useState([]);

//   const makeApiRequest = async (question) => {
//     lastQuestionRef.current = question;

//     error && setError(undefined);
//     setIsLoading(true);
//     setActiveCitation(undefined);
//     setActiveAnalysisPanelTab(undefined);

//     try {
//       const history = answers.map((a) => ({
//         user: a[0],
//         bot: a[1].answer,
//         fun_data: a[1].fun_data,
//       }));
//       let user_id = user ? user.id : 0;
//       let location = user ? user.location : null;
//       const request = {
//         location: location,
//         thread_id: thread_id,
//         user_id: user_id,
//         history: [
//           ...history,
//           { user: question, bot: undefined, fun_data: undefined },
//         ],
//         approach: Approaches.ReadRetrieveRead,
//         overrides: {
//           promptTemplate:
//             promptTemplate.length === 0 ? undefined : promptTemplate,
//           excludeCategory:
//             excludeCategory.length === 0 ? undefined : excludeCategory,
//           top: retrieveCount,
//           retrievalMode: retrievalMode,
//           semanticRanker: useSemanticRanker,
//           semanticCaptions: useSemanticCaptions,
//           suggestFollowupQuestions: useSuggestFollowupQuestions,
//         },
//       };
//       const result = await chatApi(request);
//       setThread_id(result.thread_id);
//       setAnswers([...answers, [question, result]]);
//     } catch (e) {
//       setError(e);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // const updateApiRequest = async (id: string, flag: string, feedback: string) => {
//   //     try {
//   //         const request: UpdateRequest = {
//   //             id,
//   //             flag,
//   //             feedback
//   //         };
//   //         const result = await updateApi(request);
//   //         if (result.status == "OK_FLAG") alert("Successfuly add flag.");
//   //         else if (result.status == "OK_FEEDBACK") alert("Successfuly add feedback.");
//   //         else alert("Internal Server Error.");
//   //     } catch (e) {
//   //         alert("Internal Server Error.");
//   //     }
//   // };

//   useEffect(() => {
//     if (isIframe == false && window.location !== window.parent.location) {
//       console.log('in iframe');
//       setIsIframe(true);
//     }
//   }, [isIframe]);

//   const clearChat = () => {
//     lastQuestionRef.current = '';
//     error && setError(undefined);
//     setActiveCitation(undefined);
//     setActiveAnalysisPanelTab(undefined);
//     setAnswers([]);
//     setThread_id(null);
//   };

//   useEffect(
//     () => chatMessageStreamEnd.current?.scrollIntoView({ behavior: 'smooth' }),
//     [isLoading],
//   );

//   const onPromptTemplateChange = (_ev, newValue) => {
//     setPromptTemplate(newValue || '');
//   };

//   const onRetrieveCountChange = (_ev, newValue) => {
//     setRetrieveCount(parseInt(newValue || '3'));
//   };

//   const onRetrievalModeChange = (_ev, option, index) => {
//     setRetrievalMode(option?.data || RetrievalMode.Hybrid);
//   };

//   const onUseSemanticRankerChange = (_ev, checked) => {
//     setUseSemanticRanker(!!checked);
//   };

//   const onUseSemanticCaptionsChange = (_ev, checked) => {
//     setUseSemanticCaptions(!!checked);
//   };

//   const onExcludeCategoryChanged = (_ev, newValue) => {
//     setExcludeCategory(newValue || '');
//   };

//   const onUseSuggestFollowupQuestionsChange = (_ev, checked) => {
//     setUseSuggestFollowupQuestions(!!checked);
//   };

//   const onExampleClicked = (example) => {
//     makeApiRequest(example);
//   };

//   const onShowCitation = (citation, index) => {
//     if (
//       activeCitation === citation &&
//       activeAnalysisPanelTab === AnalysisPanelTabs.CitationTab &&
//       selectedAnswer === index
//     ) {
//       setActiveAnalysisPanelTab(undefined);
//     } else {
//       setActiveCitation(citation);
//       setActiveAnalysisPanelTab(AnalysisPanelTabs.CitationTab);
//     }

//     setSelectedAnswer(index);
//   };

//   const onSetVoteFeedback = (flag, feedback, index) => {
//     const id = index.id;
//     updateApiRequest(id, flag, feedback);
//   };

//   const onToggleTab = (tab, index) => {
//     if (activeAnalysisPanelTab === tab && selectedAnswer === index) {
//       setActiveAnalysisPanelTab(undefined);
//     } else {
//       setActiveAnalysisPanelTab(tab);
//     }

//     setSelectedAnswer(index);
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.commandsContainer}>
//         <ClearChatButton
//           className={styles.commandButton}
//           onClick={clearChat}
//           disabled={!lastQuestionRef.current || isLoading}
//         />
//         {/*!isIframe && <SettingsButton className={styles.commandButton} onClick={() => setIsConfigPanelOpen(!isConfigPanelOpen)} />*/}
//       </div>
//       <div className={styles.chatRoot}>
//         <div className={styles.chatContainer}>
//           {!lastQuestionRef.current ? (
//             <div className={styles.chatEmptyState}>
//               {/* {!isIframe && <SparkleFilled fontSize={"120px"} primaryFill={"rgba(115, 118, 225, 1)"} aria-hidden="true" aria-label="Chat logo" />}
//                             {!isIframe && <h1 className={styles.chatEmptyStateTitle}>Chat with your data</h1>} */}
//               {!isIframe && (
//                 <h2 className={styles.chatEmptyStateSubtitle}>
//                   Ask anything or try an example
//                 </h2>
//               )}
//               <ExampleList onExampleClicked={onExampleClicked} />
//             </div>
//           ) : (
//             <div className={styles.chatMessageStream}>
//               {answers.map((answer, index) => (
//                 <div key={index}>
//                   <UserChatMessage message={answer[0]} />
//                   <div className={styles.chatMessageGpt}>
//                     <Answer
//                       key={index}
//                       answer={answer[1]}
//                       historyData={answers}
//                       isSelected={
//                         selectedAnswer === index &&
//                         activeAnalysisPanelTab !== undefined
//                       }
//                       onCitationClicked={(c) => onShowCitation(c, index)}
//                       onVoteClicked={(c) => onSetVoteFeedback(c, '', answer[1])}
//                       onFeedbackClicked={(c) =>
//                         onSetVoteFeedback('3', c, answer[1])
//                       }
//                       onThoughtProcessClicked={() =>
//                         onToggleTab(AnalysisPanelTabs.ThoughtProcessTab, index)
//                       }
//                       onSupportingContentClicked={() =>
//                         onToggleTab(
//                           AnalysisPanelTabs.SupportingContentTab,
//                           index,
//                         )
//                       }
//                       onFollowupQuestionClicked={(q) => makeApiRequest(q)}
//                       showFollowupQuestions={
//                         useSuggestFollowupQuestions &&
//                         answers.length - 1 === index
//                       }
//                     />
//                   </div>
//                 </div>
//               ))}
//               {isLoading && (
//                 <>
//                   <UserChatMessage message={lastQuestionRef.current} />
//                   <div className={styles.chatMessageGptMinWidth}>
//                     <AnswerLoading />
//                   </div>
//                 </>
//               )}
//               {error ? (
//                 <>
//                   <UserChatMessage message={lastQuestionRef.current} />
//                   <div className={styles.chatMessageGptMinWidth}>
//                     <AnswerError
//                       error={error.toString()}
//                       onRetry={() => makeApiRequest(lastQuestionRef.current)}
//                     />
//                   </div>
//                 </>
//               ) : null}
//               <div ref={chatMessageStreamEnd} />
//             </div>
//           )}

//           <div className={styles.chatInput}>
//             <QuestionInput
//               clearOnSend
//               placeholder="Type a new question"
//               disabled={isLoading}
//               onSend={(question) => makeApiRequest(question)}
//             />
//           </div>
//         </div>

//         {answers.length > 0 && activeAnalysisPanelTab && (
//           <AnalysisPanel
//             className={styles.chatAnalysisPanel}
//             activeCitation={activeCitation}
//             onActiveTabChanged={(x) => onToggleTab(x, selectedAnswer)}
//             citationHeight="810px"
//             answer={answers[selectedAnswer][1]}
//             activeTab={activeAnalysisPanelTab}
//           />
//         )}

//         <Panel
//           headerText="Configure answer generation"
//           isOpen={isConfigPanelOpen}
//           isBlocking={false}
//           onDismiss={() => setIsConfigPanelOpen(false)}
//           closeButtonAriaLabel="Close"
//           onRenderFooterContent={() => (
//             <DefaultButton onClick={() => setIsConfigPanelOpen(false)}>
//               Close
//             </DefaultButton>
//           )}
//           isFooterAtBottom={true}
//         >
//           <TextField
//             className={styles.chatSettingsSeparator}
//             defaultValue={promptTemplate}
//             label="Override prompt template"
//             multiline
//             autoAdjustHeight
//             onChange={onPromptTemplateChange}
//           />

//           <SpinButton
//             className={styles.chatSettingsSeparator}
//             label="Retrieve this many documents from search:"
//             min={1}
//             max={50}
//             defaultValue={retrieveCount.toString()}
//             onChange={onRetrieveCountChange}
//           />
//           <TextField
//             className={styles.chatSettingsSeparator}
//             label="Exclude category"
//             onChange={onExcludeCategoryChanged}
//           />
//           <Checkbox
//             className={styles.chatSettingsSeparator}
//             checked={useSemanticRanker}
//             label="Use semantic ranker for retrieval"
//             onChange={onUseSemanticRankerChange}
//           />
//           <Checkbox
//             className={styles.chatSettingsSeparator}
//             checked={useSemanticCaptions}
//             label="Use query-contextual summaries instead of whole documents"
//             onChange={onUseSemanticCaptionsChange}
//             disabled={!useSemanticRanker}
//           />
//           <Checkbox
//             className={styles.chatSettingsSeparator}
//             checked={useSuggestFollowupQuestions}
//             label="Suggest follow-up questions"
//             onChange={onUseSuggestFollowupQuestionsChange}
//           />
//           <Dropdown
//             className={styles.chatSettingsSeparator}
//             label="Retrieval mode"
//             options={[
//               {
//                 key: 'hybrid',
//                 text: 'Vectors + Text (Hybrid)',
//                 selected: retrievalMode == RetrievalMode.Hybrid,
//                 data: RetrievalMode.Hybrid,
//               },
//               {
//                 key: 'vectors',
//                 text: 'Vectors',
//                 selected: retrievalMode == RetrievalMode.Vectors,
//                 data: RetrievalMode.Vectors,
//               },
//               {
//                 key: 'text',
//                 text: 'Text',
//                 selected: retrievalMode == RetrievalMode.Text,
//                 data: RetrievalMode.Text,
//               },
//             ]}
//             required
//             onChange={onRetrievalModeChange}
//           />
//         </Panel>
//       </div>
//     </div>
//   );
// };

// export default Chat;
